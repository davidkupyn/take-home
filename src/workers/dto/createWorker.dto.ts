import { createInsertSchema } from 'drizzle-zod';
import { workers } from '../../db/entities/worker.entity';

export const createWorkerSchema = createInsertSchema(workers);
