import { device as DeviceTable } from '~/db/schema'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const profile_uuid = event.context.params?.uuid as string;

    return await useDrizzle()
      .select()
      .from(DeviceTable)
      .where(eq(DeviceTable.profile, profile_uuid))
      .orderBy(DeviceTable.instance)
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})