import { UserSession } from '#auth-utils';

/**
 * POST /api/auth/login
 * 
 * Effettua il login
 */
export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<{ username: string, password: string }>(event)
  const mongoUser = await modelUser.findOne({ $and: [ { username: username }, { password: password }, { status: 'active' } ] }) // null se non lo trova

  if (mongoUser) {
    const sessionData: UserSession = {
      // User data
      user: {
        id: mongoUser._id,
        login: mongoUser.username,
        role: mongoUser.role ?? 'authenticated'
      },
      // Private data accessible on server/ routes
      secure: {
        apiToken: '1234567890'
      },
      // Any extra fields for the session data
      loggedInAt: new Date()
    }
    await setUserSession(event, sessionData)
  } else {
    setResponseStatus(event, 401, "401 Unauthorized")

    return
  }

  return await getUserSession(event)
})