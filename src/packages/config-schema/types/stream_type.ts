

import typeDetect from 'type-detect';
import { Stream } from 'stream';
import { internals } from '../internals';
import { Type, TypeOptions } from './type';

export class StreamType extends Type<Stream> {
  constructor(options?: TypeOptions<Stream>) {
    super(internals.stream(), options);
  }

  protected handleError(type: string, { value }: Record<string, any>) {
    if (type === 'any.required' || type === 'stream.base') {
      return `expected value of type [Stream] but got [${typeDetect(value)}]`;
    }
  }
}
