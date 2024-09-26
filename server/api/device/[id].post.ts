import { device as DeviceTable } from '~/db/schema'
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    // @ts-expect-error
    const id_device: number = event.context.params?.id as number;
    const { canvas } = await readBody<{ canvas: string }>(event)
    return await useDrizzle()
      .update(DeviceTable)
      .set({
        canvas: canvas.toString()
      })
      .where(eq(DeviceTable.id, id_device))
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message,
    });
  }
})