import { user as UserTable } from '~/db/schema'
import { eq, or, count } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { email, username, password } = await readBody<{ email: string, username: string, password: string }>(event)
  const { transport, nodemailer } = useNodeMailer()

  const user_exists = useDrizzle()
    .select({ count: count() })
    .from(UserTable)
    .where(or(eq(UserTable.username, username), eq(UserTable.email, email)))
    .all().shift()

  if (user_exists?.count && user_exists?.count > 0) {
    throw createError({
      statusCode: 401,
      statusMessage: 'E-Mail or Username already in use'
    });
  }
  const onetime: string = randomString()

  try {
    await useDrizzle()
      .insert(UserTable)
      .values({
        username: username,
        password: password,
        email: email,
        role: "authenticated",
        status: "pending",
        consent: "{}",
        one_time_token: onetime,
        created: Date.now()
      }).execute()

      transport.sendMail({ subject: 'SC Mapping Tool - Confirm your address', text: `Confirm your address: ${onetime}`, to: 'io@nicolatomassoni.it' })
    return {
      username: username
    }
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    });
  }

  function randomString(): string {
    return (Math.random() * 1000000).toString(36).replace('.', '');
  }
})