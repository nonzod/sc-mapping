import { actionmap as ActionMapTable } from '~/db/schema'
import { eq, sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const profile_uuid = event.context.params?.uuid as string;

    const actionmapResp = useDrizzle()
      .select({
        id: ActionMapTable.id,
        profile: ActionMapTable.profile,
        device: ActionMapTable.device,
        section: ActionMapTable.section,
        button: ActionMapTable.button,
        action: sql<string>`GROUP_CONCAT(concat(${ActionMapTable.action}, ':', ${ActionMapTable.activation_mode}, ':', ${ActionMapTable.multi_tap}))`,
      })
      .from(ActionMapTable)
      .where(eq(ActionMapTable.profile, profile_uuid))
      .groupBy(ActionMapTable.button, ActionMapTable.device)
      .orderBy(ActionMapTable.device, ActionMapTable.button)
    return actionmapResp;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})