import { readFileSync } from 'fs';

/**
 * GET /api/files/<profile-uuid>
 * 
 * Ritorna il file XML uplodato, scaricabile
 */
export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', 'text/xml');
  const profile_uuid = event.context.params?.uuid as string;
  const profile = await modelProfile.findById(profile_uuid)
  const searching_path = `${process.cwd()}/${process.env.PATH_XML}/${profile.filePath}`
  try {
    const xml = readFileSync(searching_path, 'utf8')
  
    return xml
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})