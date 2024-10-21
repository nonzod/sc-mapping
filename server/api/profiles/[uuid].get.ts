
/**
 * GET /api/profiles/<profile-uuid>
 * 
 * Ritorna il documento Profile
 */
export default defineEventHandler(async (event) => {
  try {
    const profile_uuid = event.context.params?.uuid as string;
    const profile = await modelProfile.findById(profile_uuid).populate('authorId')
    
    return profile
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})