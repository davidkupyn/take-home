import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { jobs } from './job.entity';
import { history } from './history.entity';
// import { employers } from './employer.entity'; // This is not necessary

export const workers = sqliteTable('worker', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  salary: integer('salary').notNull(),
  // ownerId: integer('owner_id').references(() => employers.id), // Owner ID Could be used, but it's not necessary
  jobId: text('job_id').references(() => jobs.id, {
    onDelete: 'set null',
  }),
});

export const workerRelation = relations(workers, ({ one, many }) => ({
  // employer: one(employers, { // This is not necessary
  //   fields: [workers.ownerId],
  //   references: [employers.id],
  // }),
  job: one(jobs, {
    fields: [workers.jobId],
    references: [jobs.id],
  }),
  history: many(history),
}));

export type Worker = typeof workers.$inferSelect;
export type WorkerInsert = typeof workers.$inferInsert;
