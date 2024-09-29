import { user as UserTable } from '~/db/schema'
import { eq, or, count } from "drizzle-orm";
import { MailtrapClient } from "mailtrap"

export default defineEventHandler(async (event) => {
  const { email, username, password, token } = await readBody<{ email: string, username: string, password: string, token: string }>(event)

  if (process.env.NODE_ENV != 'development') {
    const vtt = await verifyTurnstileToken(token)

    if (vtt.success != true) {
      console.log(vtt)
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid Token'
      })
    }
  }

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
    if (process.env.SAVE_NEW_USERS != 'false') {
      await useDrizzle()
        .insert(UserTable)
        .values({
          username: username,
          password: password,
          email: email,
          role: "authenticated",
          status: "pending",
          consent: "{ privacy: true }",
          one_time_token: onetime,
          created: Date.now()
        }).execute()
    }

    // Send mail @todo da spostare su modulo template
    const confirm_link = `${process.env.DOMAIN}/user/onetime/${onetime}`
    const mailtrap_client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN })
    const sender = { name: "SC Mapping Tool", email: "noreply@nicolatomassoni.it" };
    mailtrap_client
      .send({
        from: sender,
        to: [{ email: email }],
        subject: "SC Mapping Tool - Confirm your address",
        text: "Confirm your address: ${confirm_link}",
        html: `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body style="font-family: sans-serif;">
        <div style="display: block; margin: auto; max-width: 600px;" class="main">
          <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Confirm you E-Mail address</h1>
          <p>Hi ${username}, thanks for testing SC Mapping Tool.<br />To use it you will need to verify your email address by clicking the link below</p>
          <p>Confirm your account by clicking in <a href="${confirm_link}">this link</a></p><p>Confirm your account by clicking in <a href="${confirm_link}">${confirm_link}</a></p>
        </div>
        <style>
          .main { background-color: white; }
          a:hover { border-left-width: 1em; min-height: 2em; }
        </style>
      </body>
    </html>
  `,
        category: 'Registrations'
      })
      .then((s) => { //@todo salvare l'id della mail nel response
        return {
          username: username
        }
      })
      .catch(function (e: any) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Mail not sent'
        })
      })
  } catch (e: any) {
    throw createError({
      statusCode: 500,
      statusMessage: e.message
    })
  }

  function randomString(): string {
    return (Math.random() * 1000000).toString(36).replace('.', '');
  }
})