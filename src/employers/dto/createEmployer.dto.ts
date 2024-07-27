import { createInsertSchema } from 'drizzle-zod';
import { employers } from '../../db/entities/employer.entity';

export const createEmployerSchema = createInsertSchema(employers);
