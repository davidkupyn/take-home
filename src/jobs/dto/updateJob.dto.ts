import { createInsertSchema } from 'drizzle-zod';
import { jobs } from '../../db/entities/job.entity';

// It's a separate file because in the future we might want to add some more complex validation logic or prevent some insert fields from being updated
export const updateJobSchema = createInsertSchema(jobs);
