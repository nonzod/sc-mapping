export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  await clearUserSession(event)

  return {}
})