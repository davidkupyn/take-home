import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
// import { employers } from 'src/employers/employer.entity';
import { jobs } from 'src/jobs/job.entity';

export const workers = sqliteTable('worker', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  salary: integer('salary').notNull(),
  // ownerId: integer('owner_id').references(() => employers.id),
  jobId: integer('job_id').references(() => jobs.id),
});

export const history = sqliteTable('history', {
  id: integer('id').primaryKey(),
  workerId: integer('worker_id').references(() => workers.id),
  jobId: integer('job_id').references(() => jobs.id),
  event: text('event', {
    enum: ['hired', 'fired'],
  }).notNull(),
  eventDate: integer('event_date').notNull(),
});

export const historyRelation = relations(history, ({ one }) => ({
  worker: one(workers, {
    fields: [history.workerId],
    references: [workers.id],
  }),
  job: one(jobs, {
    fields: [history.jobId],
    references: [jobs.id],
  }),
}));

export const workerRelation = relations(workers, ({ one, many }) => ({
  // employer: one(employers, {
  //   fields: [workers.ownerId],
  //   references: [employers.id],
  // }),
  job: one(jobs, {
    fields: [workers.jobId],
    references: [jobs.id],
  }),
  history: many(history),
}));

export const workInsertSchema = createInsertSchema(workers);

export type Worker = typeof workers.$inferSelect;
export type WorkerInsert = typeof workers.$inferInsert;
