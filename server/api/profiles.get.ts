import { isNotNull } from 'drizzle-orm';
import { actionmap as ActionMapTable } from '~/db/schema'

export default defineEventHandler(async (event) => {
  try {

    const actionmapResp = useDrizzle()
      .select({
        name: ActionMapTable.profile
      })
      .from(ActionMapTable)
      .where(isNotNull(ActionMapTable.profile))
      .groupBy(ActionMapTable.profile);
    return actionmapResp;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})