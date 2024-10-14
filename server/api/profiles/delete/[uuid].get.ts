import { rmSync } from 'fs'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  try {
    const profile_uuid = event.context.params?.uuid as string;
    var res

    if (user.role == 'admin') { // Admin elimina tutto
      res = await modelProfile.deleteOne({ _id: profile_uuid })
    } else {
      res = await modelProfile.deleteOne({ $and: [{ _id: profile_uuid }, { authorId: user.id }] })
    }

    if(res.deletedCount == 1) {
      //rmSync(`${process.cwd()}/${process.env.PATH_XML}/${res?.filepath}`)
    } else {
      return createError({
        statusCode: 401,
        statusMessage: 'Cannot delete profile!'
      });
    }

    return {
      id: profile_uuid
    }
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      message: e.message,
    });
  }
})
