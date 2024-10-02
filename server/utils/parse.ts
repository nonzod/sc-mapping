import { XMLParser } from "fast-xml-parser"
import { readFileSync } from 'fs';

export function parseXml(filepath: string) {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    allowBooleanAttributes: true
  };

  const parser = new XMLParser(options);
  const xmlFile = readFileSync(`${process.cwd()}/${filepath}`, 'utf8');
  const json = parser.parse(xmlFile);

  let objProfileInfo:ProfileInfo
  let devices: Array<Device> = []

  // Detect XML type
  if (json.ActionMaps.hasOwnProperty('ActionProfiles')) {
    objProfileInfo = json.ActionMaps.ActionProfiles
  } else {
    objProfileInfo = json.ActionMaps
  }

  objProfileInfo.options.forEach((e) => {
    var prefix:string = ''
    switch(e._type) {
      case 'joystick':
        prefix = 'js';
        break;
      case 'keyboard':
        prefix = 'kb'
        break;
      case 'gamepad':
        prefix = 'gp'
        break;
      case 'mouse':
        prefix = 'mo'
        break;
    }

    if (e.hasOwnProperty('_Product')) { // e._type == 'joystick' &&
      devices.push({
        instance: e._instance,
        type: e._type,
        product: e._Product,
        prefix: prefix
      })
    }
  })

  return {
    profile: {
      profileName: objProfileInfo._profileName,
      version: objProfileInfo._version,
      rebindVersion: objProfileInfo._rebindVersion,
      optionsVersion: objProfileInfo._optionsVersion
    },
    devices: devices,
    actionmap: objProfileInfo.actionmap
  };
}