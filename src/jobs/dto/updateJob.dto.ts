import { createInsertSchema } from 'drizzle-zod';
import { jobs } from '../job.entity';

export const updateJobSchema = createInsertSchema(jobs);
