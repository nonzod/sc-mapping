export default defineEventHandler(async (event) => {

  if(values.username == "zod" && values.password == "zod") {
    await setUserSession(event, {
      // User data
      user: {
        login: 'zod'
      },
      // Private data accessible on server/ routes
      secure: {
        apiToken: '1234567890'
      },
      // Any extra fields for the session data
      loggedInAt: new Date()
    })
  }
})