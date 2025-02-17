

import typeDetect from 'type-detect';
import { internals } from '../internals';
import { Type, TypeOptions } from './type';

export type StringOptions = TypeOptions<string> & {
  minLength?: number;
  maxLength?: number;
  hostname?: boolean;
};

export class StringType extends Type<string> {
  constructor(options: StringOptions = {}) {
    // We want to allow empty strings, however calling `allow('')` causes
    // Joi to allow the value and skip any additional validation.
    // Instead, we reimplement the string validator manually except in the
    // hostname case where empty strings aren't allowed anyways.
    let schema =
      options.hostname === true
        ? internals.string().hostname()
        : internals.any().custom((value: any) => {
            if (typeof value !== 'string') {
              return `expected value of type [string] but got [${typeDetect(value)}]`;
            }
          });

    if (options.minLength !== undefined) {
      schema = schema.custom((value: any) => {
        if (value.length < options.minLength!) {
          return `value has length [${value.length}] but it must have a minimum length of [${options.minLength}].`;
        }
      });
    }

    if (options.maxLength !== undefined) {
      schema = schema.custom((value: any) => {
        if (value.length > options.maxLength!) {
          return `value has length [${value.length}] but it must have a maximum length of [${options.maxLength}].`;
        }
      });
    }

    super(schema, options);
  }

  protected handleError(type: string, { limit, value }: Record<string, any>) {
    switch (type) {
      case 'any.required':
        return `expected value of type [string] but got [${typeDetect(value)}]`;
      case 'string.hostname':
        return `value must be a valid hostname (see RFC 1123).`;
    }
  }
}
