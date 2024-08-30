import { XMLParser } from "fast-xml-parser"
import { readFileSync } from 'fs';

export function parseXml(el: string) { 
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    allowBooleanAttributes: true
  };
  const parser = new XMLParser(options);
  const xmlFile = readFileSync(`${process.cwd()}/data/t1.xml`, 'utf8');
  const json = parser.parse(xmlFile);

  return json.ActionMaps[el];
 }