import { existsSync, mkdirSync } from 'fs';

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { files, device_type } = await readBody<{ files: File[], device_type: string }>(event)

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

  const basepath: string = `${objpath.year}/${objpath.month}/${objpath.day}/`
  // --

  // Solo un file viene considerato
  const ufile = await storeFileLocally(
    // @ts-expect-error
    files[0],           // the file object
    12,                 // you can add a name for the file or length of Unique ID that will be automatically generated!
    `/${basepath}`      // the folder the file will be stored in
  )

  //@todo da riscrivere decente
  return await xmlToMongo(`${objpath.mount}/${basepath}${ufile}`,  user)
  //return xmlToSqlite(`${objpath.mount}/${basepath}${ufile}`, `${basepath}${ufile}`, user)
})