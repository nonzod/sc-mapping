import { user as UserTable } from '~/db/schema'
import { eq, and } from 'drizzle-orm'
import { UserSession } from '#auth-utils';

export default defineEventHandler(async (event) => {
  const onetime_key: string = event.context.params?.key as string;

  const res_user: any = useDrizzle()
    .select()
    .from(UserTable)
    .where(and(eq(UserTable.one_time_token, onetime_key), eq(UserTable.status, 'pending')))
    .all().shift()

  if (res_user) {
    return await useDrizzle()
      .update(UserTable)
      .set({
        status: 'active'
      })
      .where(eq(UserTable.id, res_user.id))
  } else {
    throw createError({
      statusCode: 401,
      statusMessage: 'Key is not valid!',
    })
  }
})