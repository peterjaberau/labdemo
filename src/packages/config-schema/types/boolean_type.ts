

import typeDetect from 'type-detect';
import { internals } from '../internals';
import { Type, TypeOptions } from './type';

export class BooleanType extends Type<boolean> {
  constructor(options?: TypeOptions<boolean>) {
    super(internals.boolean(), options);
  }

  protected handleError(type: string, { value }: Record<string, any>) {
    if (type === 'any.required' || type === 'boolean.base') {
      return `expected value of type [boolean] but got [${typeDetect(value)}]`;
    }
  }
}
