import { profile as ProfileTable } from '~/db/schema'

export default defineEventHandler(async (event) => {
  try {

    const res_profiles = useDrizzle()
      .select({
        uuid: ProfileTable.uuid,
        name: ProfileTable.name,
        version: ProfileTable.version,
        filepath: ProfileTable.filepath,
        device_type: ProfileTable.device_type
      })
      .from(ProfileTable)
    return res_profiles;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})