import { actionmap as ActionMapTable, profile as ProfileTable } from '~/db/schema'
import { eq } from "drizzle-orm";
import { rmSync } from 'fs'

export default defineEventHandler(async (event) => {
  try {
    const profile_uuid = event.context.params?.uuid as string;
    const res_profile = useDrizzle()
      .select()
      .from(ProfileTable)
      .where(eq(ProfileTable.uuid, profile_uuid))
      .all()

    useDrizzle()
      .delete(ActionMapTable)
      .where(eq(ActionMapTable.profile, profile_uuid))
      .run()

    useDrizzle()
      .delete(ProfileTable)
      .where(eq(ProfileTable.uuid, profile_uuid))
      .run()

    rmSync(`${process.cwd()}/data/${res_profile[0].filepath}`)

    return true
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})
