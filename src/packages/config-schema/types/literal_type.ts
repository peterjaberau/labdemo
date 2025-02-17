
import { internals } from '../internals';
import { Type } from './type';

export class LiteralType<T> extends Type<T> {
  constructor(value: T) {
    super(internals.any().valid(value));
  }

  protected handleError(type: string, { value, valids: [expectedValue] }: Record<string, any>) {
    switch (type) {
      case 'any.required':
      case 'any.allowOnly':
        return `expected value to equal [${expectedValue}]`;
    }
  }
}
