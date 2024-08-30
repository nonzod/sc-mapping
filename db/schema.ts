import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const actionmap = sqliteTable('actionmap', {
    id: integer('id').primaryKey(),
    device: text('device'),
    section: text('section'),
    button: text('button'),
    action: text('action'),
  }, (actionmap) => ({})
);
