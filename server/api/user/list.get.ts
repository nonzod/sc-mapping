import { user as UserTable } from '~/db/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  try {
    /*const res_profiles = useDrizzle()
      .select()
      .from(UserTable)*/

    return modelUser.find();
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})