
export function mapToObject<V = unknown>(map: ReadonlyMap<string, V>) {
  const result: Record<string, V> = Object.create(null);
  for (const [key, value] of map) {
    result[key] = value;
  }
  return result;
}
