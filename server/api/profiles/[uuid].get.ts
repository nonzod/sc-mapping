export default defineEventHandler(async (event) => {
  try {
    const profile_uuid = event.context.params?.uuid as string;
    
    return modelProfile.findById(profile_uuid).populate('authorId')
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})