
import typeDetect from 'type-detect';
import { internals } from '../internals';
import { Type, TypeOptions } from './type';

export type URIOptions = TypeOptions<string> & {
  scheme?: string | string[];
};

export class URIType extends Type<string> {
  constructor(options: URIOptions = {}) {
    super(internals.string().uri({ scheme: options.scheme }), options);
  }

  protected handleError(type: string, { value, scheme }: Record<string, unknown>) {
    switch (type) {
      case 'any.required':
      case 'string.base':
        return `expected value of type [string] but got [${typeDetect(value)}].`;
      case 'string.uriCustomScheme':
        return `expected URI with scheme [${scheme}].`;
      case 'string.uri':
        return `value must be a valid URI (see RFC 3986).`;
    }
  }
}
