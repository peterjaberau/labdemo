
import typeDetect from 'type-detect';
import { internals } from '../internals';
import { Type, TypeOptions } from './type';

export class BufferType extends Type<Buffer> {
  constructor(options?: TypeOptions<Buffer>) {
    super(internals.binary(), options);
  }

  protected handleError(type: string, { value }: Record<string, any>) {
    if (type === 'any.required' || type === 'binary.base') {
      return `expected value of type [Buffer] but got [${typeDetect(value)}]`;
    }
  }
}
