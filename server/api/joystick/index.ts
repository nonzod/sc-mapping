export default defineEventHandler(async (event) => {
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
    [k: string] : Array<string|Array<string>>
  }

  const device = new buildDevices()
  const doc = parseXml('t1.xml', 'actionmap')
  let j: Joystick = {}

  doc.forEach((am: ActionMap) => {
    // Riordino i comandi raggruppandoli per device (Joystick)
    for(const idx in am.action) {
      const action: Action = am.action[idx];

      if(action.rebind && action.rebind['_input']) {
        const input: Array<string> = action.rebind._input.split('_')
        
        const device_name: string = input[0]
        input.shift()
        const device_input: string = input.join(' ')
              
        device.addinput(device_name, device_input);
      }
    }
  })

  return device.output
})