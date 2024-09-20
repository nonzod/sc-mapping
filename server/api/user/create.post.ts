import { user as UserTable } from '~/db/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { email, username, password } = await readBody<{ email: string, username: string, password: string }>(event)

  try {
    const res_user = await useDrizzle()
      .insert(UserTable)
      .values({
        username: username,
        password: password,
        email: email,
        role: "authenticated",
        consent: "{}"
      }).execute()

  } catch(res_user: any) {
    setResponseStatus(event, 500, res_user?.message)

    return
  }

  return {
    username: username
  }
})