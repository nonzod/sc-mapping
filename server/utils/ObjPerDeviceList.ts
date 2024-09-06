

type ObjSection = {
  name: string,
  actions: Array<ObjAction>
}

type ObjAction = {
  name: string,
  button: string
}

export class ObjPerDeviceList {
  name: string = ''
  sections: Array<ObjSection> = []

  constructor(name: string) {
    this.name = name
  }

  public addItem(item: Obj) {

  }

  private addSection() {

  }

  private addDevice() {

  }
}

/**
const ciccio: object = {
  name: 'js1',
  sections: [{
    name: 'sec1',
    actions: [{
      name: '',
      button: ''
    }]
  }]
}

     { id: 48,
       profile: 'V3K0n8ZFnysP.xml',
       device: 'mo1',
       section: 'v_pitch_mouse',
       button: 'maxis y',
       action: 'vehicle_driver' } ] }

 */