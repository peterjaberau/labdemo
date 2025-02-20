import { createActor } from 'xstate'
import { spy } from 'nanospy'

import { getTree, createTree, trees, createMachine } from './util/trees.js'
import component from './util/component'
import child from './api/specimens/child'

// Usage

// should return a tree of components
async function basicComponentsTree() {
    const { tree } = await getTree({
        initial: 'one',

        states: {
            one: {
                meta: {
                    component: component('one'),
                },

                initial: 'two',

                states: {
                    two: {
                        meta: {
                            component: component('two'),
                        },
                    },
                },
            },
        },
    })

    return { tree }
}



//should return a tree of components including child machines
async function basicComponentTreeWithChildMachines() {
    const { tree } = await getTree(child)

    return { tree }
}

//should support arrays of components
async function basicComponentTreeWithArrays() {
    const { tree } = await getTree({
        initial: 'one',

        states: {
            one: {
                meta: {
                    component: [component('one'), component('two')],
                },

                initial: 'two',

                states: {
                    two: {
                        meta: {
                            component: [component('three'), component('four')],
                        },
                    },
                },
            },
        },
    })

    return { tree }
}

//should support components at the machine root
async function basicComponentTreeWithRootComponents() {
    const { tree } = await getTree({
        initial: 'one',

        meta: {
            component: component('root'),
        },

        states: {
            one: {
                meta: {
                    component: component('one'),
                },
            },
        },
    })

    return { tree }
}

//should support props
async function basicComponentTreeWithProps() {
    const { tree } = await getTree({
        initial: 'one',

        states: {
            one: {
                meta: {
                    component: component('one'),
                    props: {
                        fooga: 1,
                        booga: 2,
                    },
                },

                initial: 'two',

                states: {
                    two: {
                        meta: {
                            component: component('two'),
                            props: {
                                wooga: 1,
                                tooga: 2,
                            },
                        },
                    },
                },
            },
        },
    })

    return { tree }
}

//should support parallel states
async function basicComponentTreeWithParallelStates() {
    const { tree } = await getTree({
        type: 'parallel',

        states: {
            one: {
                meta: {
                    component: component('one'),
                },
            },

            two: {
                meta: {
                    component: component('two'),
                },
            },
        },
    })

    return { tree }
}

//should support nested parallel states (stable: true)
async function basicComponentTreeWithNestedParallelStatesStableTrue() {
    const { tree } = await getTree(
        {
            initial: 'one',

            states: {
                one: {
                    type: 'parallel',

                    states: {
                        two: {
                            meta: {
                                component: component('two'),
                            },
                        },

                        three: {
                            meta: {
                                component: component('three'),
                            },
                        },
                    },
                },
            },
        },
        { stable: true },
    )

    return { tree }
}

//should support nested parallel states (stable: false)
async function basicComponentTreeWithNestedParallelStatesStableFalse() {
    const { tree } = await getTree(
        {
            initial: 'one',

            states: {
                one: {
                    type: 'parallel',

                    states: {
                        two: {
                            meta: {
                                component: component('two'),
                            },
                        },

                        three: {
                            meta: {
                                component: component('three'),
                            },
                        },
                    },
                },
            },
        },
        { stable: false },
    )

    return { tree }
}

//should support arbitrary ids
async function basicComponentTreeWithArbitraryIds() {
    const { tree } = await getTree({
        initial: 'one',

        states: {
            one: {
                id: 'foo',

                meta: {
                    component: component('one'),
                },

                initial: 'two',

                states: {
                    two: {
                        id: 'bar',

                        meta: {
                            component: component('two'),
                        },
                    },
                },
            },
        },
    })

    return { tree }
}

//should support holes
async function basicComponentTreeWithHoles() {
    const { tree } = await getTree({
        initial: 'one',

        states: {
            one: {
                meta: {
                    component: component('one'),
                },

                initial: 'two',

                states: {
                    two: {
                        initial: 'three',

                        states: {
                            three: {
                                meta: {
                                    component: component('three'),
                                },
                            },
                        },
                    },
                },
            },
        },
    })

    return { tree }
}

//should rebuild on machine transition
async function basicComponentTreeRebuildOnMachineTransition(context: any) {
    const tree = createTree({
        initial: 'one',

        states: {
            one: {
                meta: {
                    component: component('one'),
                },

                on: {
                    NEXT: 'two',
                },
            },

            two: {
                meta: {
                    component: component('two'),
                },
            },
        },
    })

    context.tree = tree

    const { tree: before } = await tree()

    tree.send({ type: 'NEXT' })

    const { tree: after } = await tree()

    return { before, after }
}

//shouldn't rebuild on events without changes
async function basicComponentTreeRebuildWithoutChanges(context: any) {
    const testMachine = createMachine({
        initial: 'one',

        states: {
            one: {
                meta: {
                    component: component('one'),
                },
            },
        },
    })

    const service = createActor(testMachine)
    const eventCounter = spy()

    service.subscribe(eventCounter)

    const tree = trees(service)

    context.tree = tree

    await tree()

    tree.send({ type: 'NEXT' })

    return { eventCounter }
}

//should rebuild in a stable order (change before)
async function basicComponentTreeRebuildStableOrderChangeBefore(context: any) {
    const tree = createTree({
        type: 'parallel',

        states: {
            b: {
                initial: 'one',

                on: {
                    NEXT: '.two',
                },

                states: {
                    one: {},

                    two: {
                        meta: {
                            component: component('b.two'),
                        },
                    },
                },
            },

            one: {
                meta: {
                    component: component('one'),
                },
            },
        },
    })

    context.tree = tree

    const { tree: before } = await tree()

    tree.send({ type: 'NEXT' })

    const { tree: after } = await tree()

    return { before, after }
}

//should rebuild in a stable order (change after)
async function basicComponentTreeRebuildStableOrderChangeAfter(context: any) {
    const tree = createTree({
        type: 'parallel',

        states: {
            one: {
                meta: {
                    component: component('one'),
                },
            },

            b: {
                initial: 'one',

                on: {
                    NEXT: '.two',
                },

                states: {
                    one: {},

                    two: {
                        meta: {
                            component: component('b.two'),
                        },
                    },
                },
            },
        },
    })

    context.tree = tree

    const { tree: before } = await tree()

    tree.send({ type: 'NEXT' })

    const { tree: after } = await tree()

    return { before, after }
}

//should clean up after itself
async function basicComponentTreeCleanup(context: any) {
    const callback = spy()

    const tree = createTree(
        {
            initial: 'one',

            states: {
                one: {
                    meta: {
                        component: component('one'),
                    },

                    on: {
                        NEXT: 'two',
                    },
                },

                two: {
                    meta: {
                        component: component('two'),
                    },
                },
            },
        },
        {},
        callback,
    )

    await tree()

    tree.builder.teardown()

    tree.send({ type: 'NEXT' })

    return { callback }
}


export const functionMapping: any = {
    basicComponentsTree: basicComponentsTree,
    basicComponentTreeWithChildMachines: basicComponentTreeWithChildMachines,
    basicComponentTreeWithArrays: basicComponentTreeWithArrays,
    basicComponentTreeWithRootComponents: basicComponentTreeWithRootComponents,
    basicComponentTreeWithProps: basicComponentTreeWithProps,
    basicComponentTreeWithParallelStates: basicComponentTreeWithParallelStates,
    basicComponentTreeWithNestedParallelStatesStableTrue: basicComponentTreeWithNestedParallelStatesStableTrue,
    basicComponentTreeWithNestedParallelStatesStableFalse: basicComponentTreeWithNestedParallelStatesStableFalse,
    basicComponentTreeWithArbitraryIds: basicComponentTreeWithArbitraryIds,
    basicComponentTreeWithHoles: basicComponentTreeWithHoles,
    basicComponentTreeRebuildOnMachineTransition: basicComponentTreeRebuildOnMachineTransition,
    basicComponentTreeRebuildWithoutChanges: basicComponentTreeRebuildWithoutChanges,
    basicComponentTreeRebuildStableOrderChangeBefore: basicComponentTreeRebuildStableOrderChangeBefore,
    basicComponentTreeRebuildStableOrderChangeAfter: basicComponentTreeRebuildStableOrderChangeAfter,
    basicComponentTreeCleanup: basicComponentTreeCleanup,
}
