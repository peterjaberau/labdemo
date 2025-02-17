

import { Type } from '../types';

export function isConfigSchema(obj: any): obj is Type<any> {
  return obj ? obj.__isOsdConfigSchemaType === true : false;
}
