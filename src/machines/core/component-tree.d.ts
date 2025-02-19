export type Matches = (path: string) => boolean;
export type Can = (event: EventObject) => boolean;
export type HasTag = (tag: string) => boolean;
export type Subscriber = () => Result;
export type Unsubscriber = () => void;
export type Result = {
    tree: any[];
    state: AnyMachineSnapshot;
    matches: Matches;
    can: Can;
    hasTag: HasTag;
};
export class ComponentTree {
    /**
     * @class
     * @param {AnyActor} actor The xstate Actor instance to monitor
     * @param {Subscriber} [callback] The function to call when updated component trees are generated
     * @param {object} [options] Configuration
     * @param {boolean} [options.cache] If true, will cache the result of dynamic component & prop functions
     * @param {boolean} [options.stable] When true statechart keys will be sorted to ensure stable component output order
     * @param {boolean} [options.verbose] When true runtime debugging output will be logged
     */
    constructor(actor: AnyActor | any, callback?: Subscriber | any, options?: {
        cache?: boolean;
        stable?: boolean;
        verbose?: boolean;
    } | any);
    id: string;
    _options: {
        cache: boolean;
        stable: boolean;
        verbose: boolean;
        callback: Subscriber;
    };
    _actors: Map<any, any>;
    _listeners: Set<any>;
    _cache: Map<any, any>;
    _paths: Map<any, any>;
    _invokables: Map<any, any>;
    _unsubscribes: Set<any>;
    _log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    _boundApis: {
        matches: any;
        hasTag: any;
        can: any;
        broadcast: any;
    };
    _result: {
        matches: any;
        hasTag: any;
        can: any;
        broadcast: any;
        __proto__: any;
        tree: any[];
        state: any;
    };
    _addActor({ path, actor, parent }: {
        path: any;
        actor: any;
        parent?: boolean;
    }): void;
    _watch(path: any): void;
    _onState(path: any, state: any): void;
    _shouldRun(path: any, run: any): boolean;
    _run(path: any): any;
    _walk(path: any): Promise<any[]>;
    /**
     * Remove all subscribers and null out all properties
     */
    teardown(): void;
    /**
     * Send an event to the actor and all its children
     *
     * @param {EventObject} event XState event to send
     * @param {ParameterizedObject['params']?} [options] XState options to send
     */
    broadcast(event: EventObject, options?: ParameterizedObject["params"] | null): void;
    hasTag(tag: string): boolean;
    can(event: EventObject): boolean;
    matches(path: string): boolean;
    /**
     * Send an event to the root machine only
     *
     * @param {EventObject[]} event Event to send
     * @returns {AnyMachineSnapshot} Resulting state
     */
    send(...event: EventObject[]): AnyMachineSnapshot;
    /**
     * Provides an observable API, matches the svelte store contract
     * https://svelte.dev/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values-store-contract
     *
     * @param {Subscriber} callback function to be called whenever a new tree is generated
     * @returns {Unsubscriber} Unsubscribe function
     */
    subscribe(callback: Subscriber): Unsubscriber;
}
import type { EventObject } from "xstate";
import type { AnyMachineSnapshot } from "xstate";
import type { ParameterizedObject } from "xstate";
import type { AnyActor } from "xstate";
