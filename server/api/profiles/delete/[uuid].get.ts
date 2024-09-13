import { actionmap as ActionMapTable, profile as ProfileTable, device as DeviceTable } from '~/db/schema'
import { eq } from "drizzle-orm";
import { rmSync } from 'fs'

export default defineEventHandler(async (event) => {
  const client_ip: any = getRequestHeader(event, 'x-forwarded-for')
  const allowed_ips: Array<string> = process.env.ALLOWED_IP?.split(',')

  if(!allowed_ips.includes(client_ip))
    return

  try {
    const profile_uuid = event.context.params?.uuid as string;
    const res_profile = useDrizzle()
      .select()
      .from(ProfileTable)
      .where(eq(ProfileTable.uuid, profile_uuid))
      .all()

    useDrizzle()
      .delete(ActionMapTable)
      .where(eq(ActionMapTable.profile, profile_uuid))
      .run()

    useDrizzle()
      .delete(DeviceTable)
      .where(eq(DeviceTable.profile, profile_uuid))
      .run()

    useDrizzle()
      .delete(ProfileTable)
      .where(eq(ProfileTable.uuid, profile_uuid))
      .run()

    rmSync(`${process.cwd()}/${process.env.PATH_XML}/${res_profile[0].filepath}`)

    return {
      profile: res_profile[0].name,
      uuid: res_profile[0].uuid
    }
    
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})
