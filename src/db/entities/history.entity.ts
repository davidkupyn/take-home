import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { jobs } from './job.entity';
import { workers } from './worker.entity';

export const history = sqliteTable('history', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  workerId: text('worker_id').references(() => workers.id),
  jobId: text('job_id').references(() => jobs.id),
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
