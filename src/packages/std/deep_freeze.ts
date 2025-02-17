
import { RecursiveReadonly } from '@/views/eui/packages/utility-types';

/** @public */
export type Freezable = { [k: string]: any } | any[];

/**
 * Apply Object.freeze to a value recursively and convert the return type to
 * Readonly variant recursively
 *
 * @public
 */
export function deepFreeze<T extends Freezable>(object: T) {
  // for any properties that reference an object, makes sure that object is
  // recursively frozen as well
  for (const value of Object.values(object)) {
    if (value !== null && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(object) as RecursiveReadonly<T>;
}
