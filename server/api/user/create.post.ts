import { user as UserTable } from '~/db/schema'
import { like, count, eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { email, username, password } = await readBody<{ email: string, username: string, password: string }>(event)
  const hash = password

  console.debug(hash)
  try {
    await useDrizzle()
      .insert(UserTable)
      .values({
        username: username,
        password: password,
        email: email,
        role: "authenticated",
        consent: "{}"
      })

    return {
      username: username
    }
  } catch {
    setResponseStatus(event, 500, "500 Errore creazione utente")

    return
  }
})