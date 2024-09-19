import { refreshNuxtData } from "nuxt/app"

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<{ username: string, password: string }>(event)
  
  if (username == "zod" && password == "zod") {
    const sessionData = {
      // User data
      user: {
        id: 1,
        login: username
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