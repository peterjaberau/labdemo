

import { SchemaError } from '.';

export class SchemaTypeError extends SchemaError {
  constructor(error: Error | string, public readonly path: string[]) {
    super(typeof error === 'string' ? error : error.message);

    // Set the prototype explicitly, see:
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, SchemaTypeError.prototype);
  }
}
