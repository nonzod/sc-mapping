import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  dialect: "sqlite",
  out: "./db/migrations",
  dbCredentials: {
    url: "./data/db/scm.db",
  },
} satisfies Config;