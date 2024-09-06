import { actionmap as ActionMapTable } from '~/db/schema'

export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: File[] }>(event)

  const ufile = await storeFileLocally(
    files[0], // the file object
    12,       // you can add a name for the file or length of Unique ID that will be automatically generated!
    '/'       // the folder the file will be stored in
  )

  const device = new buildDevices()
  const doc = parseXml(ufile, 'actionmap')
  let j: Joystick = {}

  doc.forEach(async (am: ActionMap) => {
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
          const actionmap = await useDrizzle().insert(ActionMapTable).values({
            device: device_name,
            section: device_section,
            button: device_input,
            action: device_action,
            profile: ufile
          }).returning().get()
        }
      }
    }
  })

  return true
})

interface File {
  name: string
  content: string
}

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

// Una sorta di array associativo con oggetti
type Joystick = {
  [k: string]: Array<string | Array<string>>
}