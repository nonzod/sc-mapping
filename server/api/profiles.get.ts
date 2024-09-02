import { actionmap as ActionMapTable } from '~/db/schema'

export default defineEventHandler(async (event) => {
  try {

    const actionmapResp = useDrizzle()
      .select({
        profile: ActionMapTable.profile
      })
      .from(ActionMapTable)
      .groupBy(ActionMapTable.profile);
    return actionmapResp;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})