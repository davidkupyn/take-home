import { createInsertSchema } from 'drizzle-zod';
import { jobs } from '../../db/entities/job.entity';

export const createJobSchema = createInsertSchema(jobs);
