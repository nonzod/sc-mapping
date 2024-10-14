import { actionmap as ActionMapTable, profile as ProfileTable, device as DeviceTable } from '~/db/schema'
import { like, count, eq, and } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid';

export async function xmlToSqlite(filepath: string, downloadpath:string, user:any) {
  const { profile, actionmap, devices } = parseXml(filepath)
  
  const uuid: string = uuidv4();
  let detected_devices: number = 0

  await useDrizzle()
    .insert(ProfileTable)
    .values({
      uuid: uuid,
      name: profile.profileName,
      user_id: user.id,
      device_type: 'Generic',
      version: profile.version,
      rebind_version: profile.rebindVersion,
      options_version: profile.optionsVersion,
      filepath: downloadpath
    })

  /**
   * Inserimento action su DB
   * @param device_section 
   * @param action 
   */
  const insertAction = async (device_section: string, action: Action) => {
    const device_action: string = action._name
    var binds: Array<Rebind> = []

    if (Array.isArray(action.rebind)) {
      binds = action.rebind
    } else {
      binds.push(action.rebind)
    }

    binds.forEach(async (r) => {
      if (r && r['_input']) {

        const input: Array<string> = r._input.split('_')

        const device_name: string = input[0]
        input.shift()
        const device_input: string = input.join(' ')

        if (device_input !== '') {
          await useDrizzle()
            .insert(ActionMapTable)
            .values({
              device: device_name,
              section: device_section,
              button: device_input,
              action: device_action,
              profile: uuid,
              multi_tap: r._multiTap,
              activation_mode: r._activationMode
            })
        }
      }
    })
  }

  /**
   * Actionmap, le action se sono multiple, arrivano in un array am.action[] altrimenti
   * direttamnte in am.action
   */
  actionmap.forEach(async (am: ActionMap) => {
    const device_section: string = am._name;

    try {
      if (Array.isArray(am.action)) {
        am.action.forEach(async (a: Action) => {
          insertAction(device_section, a)
        })
      } else {
        insertAction(device_section, am.action)
      }
    } catch {
      console.error(`Qualcosa è andato storto su ${am._name}`)
    }
  })

  // Pulizia device non realmente utilizzati
  // Verifico quali devi hanno effettivamente dei pulsanti mappati 
  devices.forEach(async (d) => {
    const res: any = await useDrizzle()
      .select({ count: count() })
      .from(ActionMapTable)
      .where(and(eq(ActionMapTable.profile, uuid), like(ActionMapTable.device, `${d.prefix}${d.instance}%`)))

    if (res[0].count > 0) {
      detected_devices++

      await useDrizzle()
        .insert(DeviceTable)
        .values({
          profile: uuid,
          name: d.product,
          instance: d.instance,
          prefix: `${d.prefix}${d.instance}`,
          type: d.type
        })
    }
  })

  await useDrizzle()
    .update(ProfileTable)
    .set({
      num_of_devices: detected_devices
    })
    .where(eq(ProfileTable.uuid, uuid))

  return {
    profile: profile.profileName,
    uuid: uuid
  }
}