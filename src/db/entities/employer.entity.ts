import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { jobs } from './job.entity';
// import { workers } from 'src/db/schema';

export const employers = sqliteTable('employer', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  status: text('status').notNull(),
});

export const employerRelation = relations(employers, ({ many }) => ({
  jobs: many(jobs),
  // workers: many(workers),
}));

export type Employer = typeof employers.$inferSelect;
export type EmployerInsert = typeof employers.$inferInsert;
