
import { internals } from '../internals';
import { Type } from './type';

export class NeverType extends Type<never> {
  constructor() {
    super(internals.any().forbidden());
  }

  protected handleError(type: string) {
    switch (type) {
      case 'any.unknown':
        return "a value wasn't expected to be present";
    }
  }
}
