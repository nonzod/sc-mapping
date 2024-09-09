import { actionmap as ActionMapTable } from '~/db/schema'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const profile_uuid = event.context.params?.uuid as string;
    const actionmapResp = useDrizzle()
      .select()
      .from(ActionMapTable)
      .where(eq(ActionMapTable.profile, profile_uuid))
      .orderBy(ActionMapTable.device, ActionMapTable.button)
    return actionmapResp;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})