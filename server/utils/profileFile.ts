import { existsSync, mkdirSync } from 'fs';

export function getProfileFilePath():string {
  // Questa roba è da migliorare...
  const today = new Date()
  const objpath: any = {
    mount: process.env.PATH_XML,
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate()
  }

  if (!existsSync(objpath.mount)) {
    mkdirSync(objpath.mount)
  }
  if (!existsSync(`${objpath.mount}/${objpath.year}`)) {
    mkdirSync(`${objpath.mount}/${objpath.year}`)
  }
  if (!existsSync(`${objpath.mount}/${objpath.year}/${objpath.month}`)) {
    mkdirSync(`${objpath.mount}/${objpath.year}/${objpath.month}`)
  }
  if (!existsSync(`${objpath.mount}/${objpath.year}/${objpath.month}/${objpath.day}`)) {
    mkdirSync(`${objpath.mount}/${objpath.year}/${objpath.month}/${objpath.day}`)
  }

  return `${objpath.year}/${objpath.month}/${objpath.day}/`
}