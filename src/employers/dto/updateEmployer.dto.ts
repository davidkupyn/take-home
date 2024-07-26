import { createInsertSchema } from 'drizzle-zod';
import { employers } from '../employer.entity';

export const updateEmployerSchema = createInsertSchema(employers);
