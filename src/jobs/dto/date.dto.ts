import { z } from 'zod';

const dateRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');

export const dateSchema = z
  .string()
  .regex(dateRegex, 'Invalid date format, expected: YYYY-MM-DD')
  .transform((dateStr) => {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    return date;
  });
