import { createInsertSchema } from 'drizzle-zod';
import { workers } from '../worker.entity';

export const createWorkerSchema = createInsertSchema(workers);
