export default defineEventHandler(async (event) => {
  const { p: page, ps: pageSize } = await readBody<{ p: number, ps: number }>(event)

  try {
    const res_profiles = await modelProfile.find({}, {}, { limit: pageSize, skip: (page - 1) * pageSize }).populate('authorId')
    return res_profiles;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})