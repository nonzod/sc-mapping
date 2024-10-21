export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { files, device_type } = await readBody<{ files: File[], device_type: string }>(event)
  const basepath: string = getProfileFilePath()
  // --

  // Solo un file viene considerato
  const ufile = await storeFileLocally(
    // @ts-expect-error
    files[0],           // the file object
    12,                 // you can add a name for the file or length of Unique ID that will be automatically generated!
    `/${basepath}`      // the folder the file will be stored in
  )

  //@todo da riscrivere decente
  return await xmlToMongo(`${basepath}${ufile}`,  user)
  //return xmlToSqlite(`${objpath.mount}/${basepath}${ufile}`, `${basepath}${ufile}`, user)
})