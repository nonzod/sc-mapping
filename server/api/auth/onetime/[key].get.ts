/**
 * GET /api/auth/onetime/<key>
 * 
 * Attiva un utente in pendig se la chiave è valida
 */
export default defineEventHandler(async (event) => {
  const onetime_key: string = event.context.params?.key as string;

  const mongoUser = await modelUser.updateOne({ $and: [{ one_time_token: onetime_key }, { status: 'pending' }] }, { status: 'active' })

  if (mongoUser.modifiedCount == 0) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Key is not valid!',
    })
  }

  return mongoUser
})