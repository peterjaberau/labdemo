function shouldReadKeys(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function getFlattenedObject(rootValue: Record<string, any>) {
  if (!shouldReadKeys(rootValue)) {
    throw new TypeError(`Root value is not flatten-able, received ${rootValue}`);
  }

  const result: { [key: string]: any } = {};
  (function flatten(prefix, object) {
    for (const [key, value] of Object.entries(object)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (shouldReadKeys(value)) {
        flatten(path, value);
      } else {
        result[path] = value;
      }
    }
  })('', rootValue);
  return result;
}
