import { createInsertSchema } from 'drizzle-zod';
import { workers } from '../../db/entities/worker.entity';

// It's a separate file because in the future we might want to add some more complex validation logic or prevent some insert fields from being updated
export const updateWorkerSchema = createInsertSchema(workers);
