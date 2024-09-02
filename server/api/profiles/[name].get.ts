import { actionmap as ActionMapTable } from '~/db/schema'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const profile_name = event.context.params?.name as string;
    const actionmapResp = useDrizzle()
      .select()
      .from(ActionMapTable)
      .where(eq(ActionMapTable.profile, profile_name))
      .orderBy(ActionMapTable.device, ActionMapTable.button)
    return actionmapResp;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})