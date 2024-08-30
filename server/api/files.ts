export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: File[] }>(event)

  for ( const file of files ) {
      await storeFileLocally(
          file,         // the file object
          't1',            // you can add a name for the file or length of Unique ID that will be automatically generated!
          '/'  // the folder the file will be stored in
      )
  }

  return 'success!'
})

interface File {
  name: string
  content: string
}