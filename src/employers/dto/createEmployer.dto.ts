import { createInsertSchema } from 'drizzle-zod';
import { employers } from '../employer.entity';

export const createEmployerSchema = createInsertSchema(employers);
