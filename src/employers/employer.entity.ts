import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
// import { workers } from 'src/db/schema';
import { jobs } from 'src/jobs/job.entity';

export const employers = sqliteTable('employer', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  status: text('status').notNull(),
});

export const employerRelation = relations(employers, ({ many }) => ({
  jobs: many(jobs),
  // workers: many(workers),
}));

export const employerInsertSchema = createInsertSchema(employers);

export type Employer = typeof employers.$inferSelect;
export type EmployerInsert = typeof employers.$inferInsert;
