

export type Serializable =
  | string
  | number
  | boolean
  | null
  | SerializableArray
  | SerializableRecord;

// we need interfaces instead of types here to allow cyclic references
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SerializableArray extends Array<Serializable> {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SerializableRecord extends Record<string, Serializable> {}
