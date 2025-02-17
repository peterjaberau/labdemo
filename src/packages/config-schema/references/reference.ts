

import { internals, Reference as InternalReference } from '../internals';

export class Reference<T> {
  public static isReference<V>(value: V | Reference<V> | undefined): value is Reference<V> {
    return (
      value != null &&
      typeof (value as Reference<V>).getSchema === 'function' &&
      internals.isRef((value as Reference<V>).getSchema())
    );
  }

  private readonly internalSchema: InternalReference;

  constructor(key: string) {
    this.internalSchema = internals.ref(key);
  }

  public getSchema() {
    return this.internalSchema;
  }
}
