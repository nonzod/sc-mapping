import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

import * as schema from '../../db/schema'

//export const tables = schema

export function useDrizzle() {
  const sqlite = new Database('./data/db/scm.db');
  const db: BetterSQLite3Database = drizzle(sqlite);

  return db
}