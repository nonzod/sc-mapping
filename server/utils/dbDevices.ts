export class dbDevices {
  output: { [k: string]: Array<string | Array<string>> } = {}

  /**
   * 
   */
  constructor() {
    console.log('Initialized');
  }

  /**
   * Aggiunge un nuovo dispositivo
   * @param name 
   */
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
    if (this.output[name])
      return true

    return false
  }

  /**
   * Aggiunge un nuovo input
   * @param name 
   * @param input 
   */
  addinput(name: string, input: Array<string> | string) {
    if (!this.hasDevice(name))
      this.addDevice(name)

    if (typeof input === 'object') {
      console.log(input.length)
    } else if (input !== '') {
      this.output[name].push(input)
    }
  }
}