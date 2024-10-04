import { XMLParser } from "fast-xml-parser"
import { readFileSync } from 'fs';
import { MongoAction, MongoAppDevice, MongoButton } from "~/server/utils/types";

/**
 * Delirio per convertire la struttura del binding di Star Citizen (raggruppata per section ed action) in una raggruppata per buttons
 */
export default defineEventHandler(async (event) => {
  const force_array = ['action', 'rebind', 'keyboard', 'mouse', 'joystick', 'gamepad'] // proprietà forzate come array in fase di conversione da XML a JSON (altrimenti non viene convertito in array se c'è un solo valore)
  const options: any = {
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    allowBooleanAttributes: true,
    isArray: (tagName: string) => {
      if (force_array.includes(tagName)) return true;
    }
  }
  const parser = new XMLParser(options);
  const xmlFile = readFileSync(`${process.cwd()}/data/test/demoprofile_new.xml`, 'utf8');
  const json = parser.parse(xmlFile);

  const appDeviceBase = await crateAppDevice(json)
  appDeviceBase.profile.appDevice = createAppDeviceEntry(appDeviceBase)
  await appDeviceBase.profile.save()

  /**
   * Inserisce gli oggetti appDevice con le informazioni base al modello schema
   * 
   * @param objProfileInfo
   */
  async function crateAppDevice(json: any) {
    const device_types = ['keyboard', 'mouse', 'joystick', 'gamepad']
    let objProfileInfo: any = {}
    // Detect XML type
    // Cambia la radice del file XML tra il vecchio e il nuovo formato di Star Citizen
    if (json.ActionMaps.hasOwnProperty('ActionProfiles')) {
      objProfileInfo = json.ActionMaps.ActionProfiles
    } else {
      objProfileInfo = json.ActionMaps
    }
    const profile = new modelProfile(objProfileInfo)
    var app_device_entry: MongoAppDevice[] = []
    device_types.forEach(async (dp: string) => {
      objProfileInfo.CustomisationUIHeader.devices[dp].forEach(async (d: any) => {
        var p: string
        switch (dp) {
          case 'joystick':
            p = 'js'
            break
          case 'keyboard':
            p = 'kb'
            break
          case 'gamepad':
            p = 'gp'
            break
          case 'mouse':
            p = 'mo'
            break
        }

        profile.appDevice.push({
          name: dp,
          prefix: p,
          instance: d._instance
        })

        app_device_entry.push({
          name: dp,
          prefix: p,
          instance: d._instance,
          buttons: [],
          canvas: null
        })
      })
    })

    return { profile: profile, app_device_entry: app_device_entry }
  }

  /**
  * Delirio per creare AppDevice dalla struttura xml
  */
  function createAppDeviceEntry(b: { profile: any, app_device_entry: MongoAppDevice[] }): any {
    b.profile.actionmap.forEach(async (am: any) => {
      am.action.forEach(async (a: MongoAction) => {
        a.rebind.forEach((r) => {
          const rebind_prefix: string = r._input.slice(0, 2)
          const rebind_button: string = r._input.slice(4)
          const rebind_instance: number = Number(r._input.slice(2, 3))

          if (rebind_button == '') { // Star Citizen salva binding senza nome...
            //console.log(r) @todo potrebbe essere buono salvare il numero di entry vuote
            return
          }

          // Ricerca di un device precedentemente creato in base a prefisso e instance   
          const adIndex = b.app_device_entry.findIndex((obj: MongoAppDevice) => obj.prefix == rebind_prefix && obj.instance == rebind_instance)
          // Aggiungo i buttons al device con indice adIndex
          b.app_device_entry[adIndex].buttons.push({
            name: rebind_button,
            section: am._name,
            actions: []
          })

          // Ricercadi un button precedentemente creato in base a nome e section 
          const bIndex = b.app_device_entry[adIndex].buttons.findIndex((obj: MongoButton) => {
            return obj.name == rebind_button && obj.section == am._name
          })
          // Aggiungo le action al button con indice bIndex
          b.app_device_entry[adIndex].buttons[bIndex].actions = []
          b.app_device_entry[adIndex].buttons[bIndex].actions.push({
            name: a._name,
            activationMode: r._activationMode || null,
            multiTap: r._multiTap || null
          })
        })
      })
    })

    return b.app_device_entry
  }

  return appDeviceBase.profile
})