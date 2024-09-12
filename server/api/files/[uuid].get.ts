import { profile as ProfileTable } from '~/db/schema'
import { eq } from "drizzle-orm";
import { readFileSync } from 'fs';

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', 'text/xml');

  try {
    const profile_uuid = event.context.params?.uuid as string;
    const res_profile = useDrizzle()
      .select()
      .from(ProfileTable)
      .where(eq(ProfileTable.uuid, profile_uuid))
      .all()

      const xml = readFileSync(`${process.cwd()}/${process.env.PATH_XML}/${res_profile[0].filepath}`, 'utf8')
      
      return xml
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})