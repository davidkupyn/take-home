import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class OptionalParseUUIDPipe
  implements PipeTransform<string, string | undefined>
{
  transform(
    value: string | undefined,
    _metadata: ArgumentMetadata,
  ): string | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }
    function isUUID(value: string): boolean {
      const uuidRegex =
        // eslint-disable-next-line max-len
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    }
    if (!isUUID(value)) {
      throw new BadRequestException(
        `Validation failed. "${value}" is not a UUID.`,
      );
    }
    return value;
  }
}
