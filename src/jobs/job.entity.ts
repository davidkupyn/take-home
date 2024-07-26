import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { employers } from 'src/employers/employer.entity';
import { history, workers } from 'src/workers/worker.entity';

export const jobs = sqliteTable('job', {
  id: integer('id').primaryKey(),
  status: text('status', {
    enum: ['draft', 'active', 'archive'],
  }).notNull(),
  name: text('name').notNull(),
  creationDate: integer('created_at').default(
    sql`(cast (unixepoch () as int))`,
  ),
  salary: integer('salary').notNull(),
  ownerId: integer('owner_id').references(() => employers.id),
});

export const jobRelation = relations(jobs, ({ one, many }) => ({
  employer: one(employers, {
    fields: [jobs.ownerId],
    references: [employers.id],
  }),
  workers: many(workers),
  history: many(history),
}));

export const jobInsertSchema = createInsertSchema(jobs);

export type Job = typeof jobs.$inferSelect;
export type JobInsert = typeof jobs.$inferInsert;
