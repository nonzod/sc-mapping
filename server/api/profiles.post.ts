import { profile as ProfileTable, user as UserTable } from '~/db/schema'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { p: page, ps: pageSize } = await readBody<{ p: number, ps: number }>(event)

  try {
    const res_profiles = useDrizzle()
      .select({
        uuid: ProfileTable.uuid,
        name: ProfileTable.name,
        version: ProfileTable.version,
        filepath: ProfileTable.filepath,
        device_type: ProfileTable.device_type,
        username: UserTable.username,
        user_id: UserTable.id
      })
      .from(ProfileTable)
      .leftJoin(UserTable, eq(ProfileTable.user_id, UserTable.id))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
    return res_profiles;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})