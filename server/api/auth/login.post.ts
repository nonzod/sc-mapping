import { user as UserTable } from '~/db/schema'
import { sha256 } from 'js-sha256';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<{ username: string, password: string }>(event)
  
  const res_user = useDrizzle()
    .select()
    .from(UserTable).all().shift()

  if (username == res_user?.username && sha256(password) == res_user?.password) {
    const sessionData = {
      // User data
      user: {
        id: res_user?.id,
        login: res_user?.username,
        role: res_user?.role
      },
      // Private data accessible on server/ routes
      secure: {
        apiToken: '1234567890'
      },
      // Any extra fields for the session data
      loggedInAt: new Date()
    }
    await setUserSession(event, sessionData?)
  } else {
    setResponseStatus(event, 401, "401 Unauthorized")
    
    return
  }

  return await getUserSession(event)
})