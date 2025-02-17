

export function mapValuesOfMap<T, G, H>(map: Map<T, G>, mapper: (item: G) => H): Map<T, H> {
  const result = new Map();
  for (const [key, value] of map.entries()) {
    result.set(key, mapper(value));
  }
  return result;
}

export function groupIntoMap<T, G, H>(collection: T[], groupBy: (item: T) => G): Map<G, T[]> {
  const map = new Map<G, T[]>();
  collection.forEach((item) => {
    const key = groupBy(item);
    const values = map.get(key) || [];
    values.push(item);
    map.set(key, values);
  });
  return map;
}
