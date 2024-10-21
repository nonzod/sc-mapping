import { device as DeviceTable } from '~/db/schema'
import { eq } from "drizzle-orm";

/**
 * @deprecated
 * 
 * Select Device by id
 * 
 * GET device/[id] 
 */
export default defineEventHandler(async (event) => {
  try {
    const id_device:string = event.context.params?.id as string;

    return useDrizzle()
      .select()
      .from(DeviceTable)
      .where(eq(DeviceTable.id, id_device))
      .all().shift()
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})