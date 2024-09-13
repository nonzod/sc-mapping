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

  let objProfileInfo: { _profileName: string, _version: number, _rebindVersion: number, _optionsVersion: number, options: Array<any>, actionmap: Array<any> }
  let devices: Array<{ instance: number, product: string }> = []

  // Detect XML type
  if (json.ActionMaps.hasOwnProperty('ActionProfiles')) {
    objProfileInfo = json.ActionMaps.ActionProfiles
  } else {
    objProfileInfo = json.ActionMaps
  }

  objProfileInfo.options.forEach((e) => {
    if (e._type == 'joystick' && e.hasOwnProperty('_Product')) {
      devices.push({
        instance: e._instance,
        product: e._Product
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