import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const actionmap = sqliteTable('actionmap', {
  id: integer('id').primaryKey(),
  profile: text('profile').references(() => profile.uuid),
  device: text('device'),
  section: text('section'),
  button: text('button'),
  action: text('action'),
}, (actionmap) => ({})
);

export const profile = sqliteTable('profile', {
  uuid: text('uuid').primaryKey({ autoIncrement: false }),
  name: text('name'),
  version: integer('version'),
  rebind_version: integer('rebind_version'),
  options_version: integer('options_version'),
}, (profile) => ({})
);
