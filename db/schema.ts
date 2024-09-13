import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

/**
 * Profile details
 */
export const profile = sqliteTable('profile', {
  uuid: text('uuid').primaryKey({ autoIncrement: false }),
  name: text('name'),
  device_type: text('device_type'),
  num_of_devices: integer('num_of_devices'),
  version: integer('version'),
  rebind_version: integer('rebind_version'),
  options_version: integer('options_version'),
  filepath: text('filepath')
}, (profile) => ({})
);

/**
 * Profile devices
 */
export const device = sqliteTable('device', {
  id: integer('id').primaryKey(),
  profile: text('profile').references(() => profile.uuid),
  type: text('type'),
  name: text('name'),
  instance: integer('instance'),
  prefix: text('prefix')
}, (device) => ({})
);

/**
 * Profile bindings
 */
export const actionmap = sqliteTable('actionmap', {
  id: integer('id').primaryKey(),
  profile: text('profile').references(() => profile.uuid),
  device: text('device'),
  section: text('section'),
  button: text('button'),
  action: text('action'),
}, (actionmap) => ({})
);