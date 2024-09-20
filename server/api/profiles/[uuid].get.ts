import { profile as ProfileTable } from '~/db/schema'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const profile_uuid = event.context.params?.uuid as string;
    return useDrizzle()
      .select()
      .from(ProfileTable)
      .where(eq(ProfileTable.uuid, profile_uuid))
      .all().shift()
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})