import { profile as ProfileTable } from '~/db/schema'
import { count, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  
  try {
    const res_profiles = useDrizzle()
      .select({ count: count() })
      .from(ProfileTable)
      .all().shift()

    //const pages = res_profiles?.count > 2 ? res_profiles?.count / 2 : 1

    return res_profiles;
  } catch (e: any) {
    throw createError({
      statusCode: 400,
      statusMessage: e.message,
    });
  }
})