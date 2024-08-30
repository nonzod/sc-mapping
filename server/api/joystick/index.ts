class buildDevices {
  output: { [k: string] : Array<string|Array<string>> } = {}

  constructor() {
    console.log('Initialized');
  }

  addDevice(name: string): void {
    this.output[name] = new Array()
  }

  /**
   * Esista già la proprietà per il device
   * 
   * @param name 
   * @returns 
   */
  hasDevice(name: string): boolean {
    if(this.output[name])
      return true

    return false
  }

  addinput(name: string, input: Array<string>|string) {
    if(!this.hasDevice(name))
      this.addDevice(name)

    if(typeof input === 'object') {
      console.log(input.length)
    } else if(input !== '') {
      this.output[name].push(input)
    }
  }
}


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
  const doc = parseXml('actionmap')
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