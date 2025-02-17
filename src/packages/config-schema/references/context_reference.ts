
import { Reference } from './reference';

export class ContextReference<T> extends Reference<T> {
  constructor(key: string) {
    super(`$${key}`);
  }
}
