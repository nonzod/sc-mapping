import { profile as ProfileTable } from '~/db/schema'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event)

    return useDrizzle()
      .select()
      .from(ProfileTable)
      .where(eq(ProfileTable.user_id, user.id))
      .all()
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})