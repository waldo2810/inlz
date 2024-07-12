import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const projectsTable = sqliteTable('projects', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
});

export const tasksTable = sqliteTable('tasks', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  dueDate: text('due_date').notNull(),
  projectId: integer('project_id')
    .notNull()
    .references(() => projectsTable.id, { onDelete: 'cascade' }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
});

export const usersTable = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
});

export type InsertProject = typeof projectsTable.$inferInsert;
export type SelectProject = typeof projectsTable.$inferSelect;

export type InsertTask = typeof tasksTable.$inferInsert;
export type SelectTask = typeof tasksTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
