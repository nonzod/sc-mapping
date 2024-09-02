
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "sqlite",
  out: "./db/migrations",
  dbCredentials: {
    url: "./data/db/scm.db",
  },
})