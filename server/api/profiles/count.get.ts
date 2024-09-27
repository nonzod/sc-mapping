import { profile as ProfileTable } from '~/db/schema'
import { count, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  
  try {
    return useDrizzle()
      .select({ count: count() })
      .from(ProfileTable)
      .all().shift()
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})