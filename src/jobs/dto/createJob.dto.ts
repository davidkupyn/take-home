import { createInsertSchema } from 'drizzle-zod';
import { jobs } from '../job.entity';

export const createJobSchema = createInsertSchema(jobs);
