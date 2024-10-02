import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

/**
 * Profile details
 */
export const profile = sqliteTable('profile', {
  uuid: text('uuid').primaryKey({ autoIncrement: false }),
  name: text('name'),
  user_id: integer('user_id').references(() => user.id),
  device_type: text('device_type'),
  num_of_devices: integer('num_of_devices'),
  version: integer('version'),
  rebind_version: integer('rebind_version'),
  options_version: integer('options_version'),
  filepath: text('filepath')
}, (profile) => ({})
)

/**
 * Profile devices
 */
export const device = sqliteTable('device', {
  id: integer('id').primaryKey(),
  profile: text('profile').references(() => profile.uuid),
  type: text('type'),
  name: text('name'),
  instance: integer('instance'),
  prefix: text('prefix'),
  options: text('options'),
  device_options: text('device_options'),
  canvas: text('canvas'),
  canvas_grid: text('canvas_grid')
}, (device) => ({})
)

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
  activation_mode: text('activation_mode'),
  multi_tap: integer('multi_tap')
}, (actionmap) => ({})
)

/**
 * Users
 */
export const user = sqliteTable('user', {
  id: integer('id').primaryKey(),
  username: text('username').unique(),
  password: text('password'),
  status: text('status'), // active|pending|banned
  role: text('role'),
  email: text('email').unique(),
  consent: text('consent'),
  one_time_token: text('one_time_token'),
  created: integer('created'), // Unix timestamp
  last_login: integer('created') // Unix timestamp
}, (user) => ({})
)