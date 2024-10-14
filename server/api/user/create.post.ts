import { user as UserTable } from '~/db/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  // Check role, @todo seistema di ACL da implementare
  if (user.role != 'admin') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not for you',
    });
  }

  const { email, username, password } = await readBody<{ email: string, username: string, password: string }>(event)

  const mongoUser = await modelUser.findOne({ $or: [{ username: username }, { email: email }] }) // null se non lo trova
  if (mongoUser !== null) {
    throw createError({
      statusCode: 401,
      statusMessage: 'E-Mail or Username already in use'
    });
  }

  try {
    /*const res_user = await useDrizzle()
      .insert(UserTable)
      .values({
        username: username,
        password: password,
        email: email,
        role: "authenticated",
        consent: "{}"
      }).execute()*/

    await new modelUser({
      username: username,
      password: password,
      email: email,
      role: "authenticated",
      status: "active",
      consent: "{ privacy: true }",
      one_time_token: '',
      created: Date.now()
    }).save()

  } catch (res_user: any) {
    setResponseStatus(event, 500, res_user?.message)

    return
  }

  return {
    username: username
  }
})