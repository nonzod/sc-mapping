import { device as DeviceTable } from '~/db/schema'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const id_device:string = event.context.params?.id as string;

    return await useDrizzle()
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