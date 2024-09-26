import { device as DeviceTable, profile as ProfileTable } from '~/db/schema'
import { eq, and } from "drizzle-orm";

/**
 * Update Device by Id ** auth required **
 *  
 * POST device/[id] 
 */
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  try {
    // @ts-expect-error
    const id_device:number = event.context.params?.id as number;
    const { canvas } = await readBody<{ canvas: string }>(event)
    var res_profile:any = false

    const res_device = useDrizzle()
      .select({
        profile_uuid: DeviceTable.profile
      })
      .from(DeviceTable)
      .where(eq(DeviceTable.id, id_device))
      .all().shift()

    if (user.role != 'admin') { // Admin può tutto
      res_profile = useDrizzle()
        .select()
        .from(ProfileTable)
        .where(and(eq(ProfileTable.uuid, res_device?.profile_uuid), eq(ProfileTable.user_id, user.id)))
        .all().shift()
    } else {
      res_profile = true
    }

    if (res_profile) {
      return await useDrizzle()
        .update(DeviceTable)
        .set({
          canvas: canvas.toString()
        })
        .where(eq(DeviceTable.id, id_device))
    } else {
      return createError({
        statusCode: 401,
        statusMessage: 'You can only update your own layouts!'
      });
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message,
    });
  }
})