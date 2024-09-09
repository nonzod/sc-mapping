import { XMLParser } from "fast-xml-parser"
import { readFileSync } from 'fs';

export function parseXml(filepath: string, el: string) {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    allowBooleanAttributes: true
  };
  const parser = new XMLParser(options);
  const xmlFile = readFileSync(`${process.cwd()}/${filepath}`, 'utf8');
  const json = parser.parse(xmlFile);

  return {
    profile: {
      profileName: json.ActionMaps._profileName,
      version: json.ActionMaps._version,
      rebindVersion: json.ActionMaps._rebindVersion,
      optionsVersion: json.ActionMaps._optionsVersion
    }, 
    actionmap: json.ActionMaps[el]
  };
}