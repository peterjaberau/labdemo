

import { SchemaTypeError } from '.';

export class SchemaTypesError extends SchemaTypeError {
  constructor(error: Error | string, path: string[], public readonly errors: SchemaTypeError[]) {
    super(error, path);

    // Set the prototype explicitly, see:
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, SchemaTypesError.prototype);
  }
}
