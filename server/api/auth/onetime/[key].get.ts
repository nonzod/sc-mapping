export default defineEventHandler(async (event) => {
  const onetime_key: string = event.context.params?.key as string;

  /*const res_user: any = useDrizzle()
    .select()
    .from(UserTable)
    .where(and(eq(UserTable.one_time_token, onetime_key), eq(UserTable.status, 'pending')))
    .all().shift()*/

  const mongoUser = await modelUser.updateOne({ $and: [{ one_time_token: onetime_key }, { status: 'pending' }] }, { status: 'active' })

  if (mongoUser.modifiedCount == 0) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Key is not valid!',
    })
  }

  return mongoUser

  /*if (mongoUser) {
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
  }*/
})