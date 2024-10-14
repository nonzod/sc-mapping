export type ActionMapDbRow = {
  id: number,
  profile: string,
  device: string,
  section: string,
  button: string,
  action: string,
}

export type ActionMap = {
  _name: string,
  action: Action[]
}

export type FormattedActionMap = {
  name: string,
  activation_mode: string|null,
  multi_tap: number|null
}

export type Action = {
  _name: string,
  rebind: Rebind | Array<Rebind>
}

export type Rebind = {
  _input: string
  _multiTap: string|null,
  _activationMode: number|null
}

export type ProfileInfo = {
  _profileName: string,
  _version: number,
  _rebindVersion: number,
  _optionsVersion: number,
  options: Array<any>,
  actionmap: Array<any>
}

export type Device = {
  instance: number,
  product: string,
  type: string,
  prefix: string
}

export type Button = {
  name: string,
  actions: string[]|null,
  section: string
}

export type MongoButtonAction = {
  name: string,
  section: string,
  activationMode: string | null,
  multiTap: number | null
}

export type MongoButton = {
    name: string,
    actions: MongoButtonAction[] | never
}

export type MongoAppDevice = {
  name: string,
  prefix: string,
  instance: number,
  buttons: MongoButton[] | never,
  canvas: any | null
}

export type MongoRebind = {
  _input:string,
  _activationMode:string|undefined,
  _multiTap: number|undefined
}

export type MongoAction = {
  rebind: MongoRebind[],
  _name: string
}

export type MongoActionMap = {
  action: MongoAction[],
  _name: string
}