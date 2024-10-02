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
  activation_mode: string,
  multi_tap: number
}

export type Action = {
  _name: string,
  rebind: Rebind | Array<Rebind>
}

export type Rebind = {
  _input: string
  _multiTap: string,
  _activationMode: number
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
  actions?: string[],
  section: string
}