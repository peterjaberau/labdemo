

/** @internal */
export interface CoreService<TSetup = void, TStart = void> {
  setup(...params: any[]): TSetup | Promise<TSetup>;
  start(...params: any[]): TStart | Promise<TStart>;
  stop(): void | Promise<void>;
}
