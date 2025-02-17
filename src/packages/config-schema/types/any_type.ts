
import typeDetect from 'type-detect';
import { internals } from '../internals';
import { Type, TypeOptions } from './type';

export class AnyType extends Type<any> {
  constructor(options?: TypeOptions<any>) {
    super(internals.any(), options);
  }

  protected handleError(type: string, { value }: Record<string, any>) {
    if (type === 'any.required') {
      return `expected value of type [any] but got [${typeDetect(value)}]`;
    }
  }
}
