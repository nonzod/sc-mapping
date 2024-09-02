import { XMLParser } from "fast-xml-parser"
import { readFileSync } from 'fs';

export function parseXml(filename: string, el: string) { 
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    allowBooleanAttributes: true
  };
  const parser = new XMLParser(options);
  const xmlFile = readFileSync(`${process.cwd()}/data/${filename}`, 'utf8');
  const json = parser.parse(xmlFile);

  return json.ActionMaps[el];
 }