import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const parsedValue = this.schema.safeParse(value);
    if (parsedValue.success) {
      return parsedValue.data;
    }
    throw new BadRequestException(parsedValue.error.errors);
  }
}
