import { actionmap as ActionMapTable, profile as ProfileTable, device as DeviceTable } from '~/db/schema'
import { eq, and } from "drizzle-orm";
import { rmSync } from 'fs'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  try {
    const profile_uuid = event.context.params?.uuid as string;
    var res_profile

    if (user.role == 'admin') { // Admin elimina tutto
      res_profile = useDrizzle()
        .select()
        .from(ProfileTable)
        .where(eq(ProfileTable.uuid, profile_uuid))
        .all().shift()
    } else {
      res_profile = useDrizzle()
        .select()
        .from(ProfileTable)
        .where(and(eq(ProfileTable.uuid, profile_uuid), eq(ProfileTable.user_id, user.id)))
        .all().shift()
    }

    if (res_profile) {
      useDrizzle()
        .delete(ActionMapTable)
        .where(eq(ActionMapTable.profile, profile_uuid))
        .run()

      useDrizzle()
        .delete(DeviceTable)
        .where(eq(DeviceTable.profile, profile_uuid))
        .run()

      useDrizzle()
        .delete(ProfileTable)
        .where(eq(ProfileTable.uuid, profile_uuid))
        .run()

      rmSync(`${process.cwd()}/${process.env.PATH_XML}/${res_profile?.filepath}`)

      return {
        profile: res_profile?.name,
        uuid: res_profile?.uuid
      }
    } else {
      return createError({
        statusCode: 401,
        statusMessage: 'Puoi eliminare solo i tuo profili!'
      });
    }

  } catch (e: any) {
    throw createError({
      statusCode: 400,
      message: e.message,
    });
  }
})
