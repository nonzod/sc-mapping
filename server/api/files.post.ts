import { actionmap as ActionMapTable, profile as ProfileTable } from '~/db/schema'
import { v4 as uuidv4 } from 'uuid';
import { existsSync, mkdirSync } from 'fs';

export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: File[] }>(event)

  // Questa roba è da migliorare...
  const today = new Date()
  const objpath:any = {
    mount: './data/xml',
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate()
  }

  if(!existsSync(objpath.mount)) {
    mkdirSync(objpath.mount)
  }
  if(!existsSync(`${objpath.mount}/${objpath.year}`)) {
    mkdirSync(`${objpath.mount}/${objpath.year}`)
  }
  if(!existsSync(`${objpath.mount}/${objpath.year}/${objpath.month}`)) {
    mkdirSync(`${objpath.mount}/${objpath.year}/${objpath.month}`)
  }
  if(!existsSync(`${objpath.mount}/${objpath.year}/${objpath.month}/${objpath.day}`)) {
    mkdirSync(`${objpath.mount}/${objpath.year}/${objpath.month}/${objpath.day}`)
  }

  const basepath: string = `${objpath.year}/${objpath.month}/${objpath.day}/`
  // --

  const ufile = await storeFileLocally(
    files[0],           // the file object
    12,                 // you can add a name for the file or length of Unique ID that will be automatically generated!
    `/${basepath}`      // the folder the file will be stored in
  )

  const uuid: string = uuidv4(); 
  const { profile, actionmap } = parseXml(`${objpath.mount}/${basepath}${ufile}`, 'actionmap')

  useDrizzle().insert(ProfileTable).values({
    uuid: uuid,
    name: profile.profileName,
    version: profile.version,
    rebind_version: profile.rebindVersion,
    options_version: profile.optionsVersion,
    filepath: `xml/${basepath}${ufile}`
  }).run()

  actionmap.forEach(async (am: ActionMap) => {
    const device_section: string = am._name;

    for (const idx in am.action) {
      const action: Action = am.action[idx];
      const device_action: string = action._name

      if (action.rebind && action.rebind['_input']) {
        const input: Array<string> = action.rebind._input.split('_')

        const device_name: string = input[0]
        input.shift()
        const device_input: string = input.join(' ')
        
        if (device_input !== '') {
          useDrizzle().insert(ActionMapTable).values({
            device: device_name,
            section: device_section,
            button: device_input,
            action: device_action,
            profile: uuid
          }).run()
        }
      }
    }
  })

  return true
})

type ActionMap = {
  _name: string,
  action: Array<Action>
}

type Action = {
  _name: string,
  rebind: Rebind
}

type Rebind = {
  _input: string
}