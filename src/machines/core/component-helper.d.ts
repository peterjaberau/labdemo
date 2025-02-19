export type StateNode = import("xstate").AnyStateNodeDefinition;
export type Props = () => object | object;
export type ComponentAndProps = {
    component: Function;
    props: Props;
};
/**
 * @typedef {import("xstate").AnyStateNodeDefinition} StateNode
 * @typedef {() => object | object} Props
 * @typedef {{ component: Function, props: Props }} ComponentAndProps
 */
/**
 * @param {Function | ComponentAndProps} child - Component instance, or component loader
 * @param {StateNode} node - Xstate node data
 * @returns {StateNode} an xstate node containing component information in its meta
 */
export function componentHelper(child: Function | ComponentAndProps, node?: StateNode): StateNode;
