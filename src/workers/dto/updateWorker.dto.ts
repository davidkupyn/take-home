import { createInsertSchema } from 'drizzle-zod';
import { workers } from '../worker.entity';

export const updateWorkerSchema = createInsertSchema(workers);
