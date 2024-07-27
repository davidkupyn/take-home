import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { employers } from './employer.entity';
import { workers } from './worker.entity';
import { history } from './history.entity';

export const jobs = sqliteTable('job', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  status: text('status', {
    enum: ['draft', 'active', 'archive'],
  }).notNull(),
  name: text('name').notNull(),
  creationDate: integer('created_at').default(
    sql`(cast (unixepoch () as int))`,
  ),
  salary: integer('salary').notNull(),
  ownerId: text('owner_id').references(() => employers.id, {
    onDelete: 'cascade',
  }),
});

export const jobRelation = relations(jobs, ({ one, many }) => ({
  employer: one(employers, {
    fields: [jobs.ownerId],
    references: [employers.id],
  }),
  workers: many(workers),
  history: many(history),
}));

export type Job = typeof jobs.$inferSelect;
export type JobInsert = typeof jobs.$inferInsert;
