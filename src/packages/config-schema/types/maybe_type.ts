

import { Type } from './type';

export class MaybeType<V> extends Type<V | undefined> {
  constructor(type: Type<V> | any) {
    super(
      type
        .getSchema()
        .optional()
        .default(() => undefined, 'undefined')
    );
  }
}
