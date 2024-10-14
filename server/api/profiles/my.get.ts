export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event)
    
    const res = await modelProfile.find({ authorId: user.id }, {}, { limit: 25 }).exec()

    return res
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})