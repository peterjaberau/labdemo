import { fromCallback, fromPromise } from "xstate";
import { createTree, getTree, createMachine } from "./util/trees";
import component from "./util/component";

// eslint-disable-next-line no-empty-function
const NOOP = () => {};


async function supportInvokedChildMachines(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    component : component("child"),
                },
            },
        },
    });

    const { tree } = await getTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id  : "child",
                    src : childMachine,
                },

                meta : {
                    component : component("one"),
                },
            },
        },
    });

    return { tree };
}

async function supportInvokedChildMachinesWithStateNames(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    component : component("child"),
                },
            },
        },
    });

    const { tree } = await getTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id  : "one",
                    src : childMachine,
                },

                meta : {
                    component : component("one"),
                },
            },
        },
    });

    return { tree };
}

async function supportInvokedChildMachinesWithOtherInvokedElements(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    component : component("child"),
                },
            },
        },
    });

    const { tree } = await getTree({
        initial : "one",

        states : {
            one : {
                invoke : [
                    {
                        id  : "child",
                        src : childMachine,
                    },
                    {
                        id  : "fake",
                        src : fromCallback(NOOP),
                    },
                ],
            },
        },
    });

    return { tree };
}

async function supportRootComponentsInInvokedChildMachines(context: any) {
    const childMachine = createMachine({
        initial : "child",

        meta : {
            component : component("root"),
        },

        states : {
            child : {
                meta : {
                    component : component("child"),
                },
            },
        },
    });

    const { tree } = await getTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id  : "child",
                    src : childMachine,
                },

                meta : {
                    component : component("one"),
                },
            },
        },
    });

    return { tree };
}

async function supportInvokedChildMachinesInAParallelState(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    component : component("child"),
                },
            },
        },
    });

    const { tree } = await getTree({
        type : "parallel",

        states : {
            one : {
                invoke : {
                    id  : "child",
                    src : childMachine,
                },

                meta : {
                    component : component("one"),
                },
            },

            two : {
                meta : {
                    component : component("two"),
                },
            },
        },
    });

    return { tree };
}

async function supportInvokedChildMachinesInAParallelStateWithRootComponents(context: any) {
    const childMachine = createMachine({
        initial : "child",

        meta : {
            component : component("child"),
        },

        states : {
            child : {},
        },
    });

    const { tree } = await getTree({
        type : "parallel",

        states : {
            one : {
                invoke : {
                    id  : "child-one",
                    src : childMachine,
                },
            },

            two : {
                invoke : {
                    id  : "child-two",
                    src : childMachine,
                },
            },
        },
    });

    return { tree };
}

async function ignoreNonStatechartChildrenPromise(context: any) {
    const { tree } = await getTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id : "child",
                    src : fromPromise(() => new Promise(NOOP)),
                },

                meta : {
                    component : component("one"),
                },
            },
        },
    });

    return { tree };
}

async function ignoreNonStatechartChildrenCallback(context: any) {
    const { tree } = await getTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id : "child",
                    src : fromCallback(NOOP),
                },

                meta : {
                    component : component("one"),
                },
            },
        },
    });

    return { tree };
}

async function removeDataOnceTheInvokedChildMachineIsHalted(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    component : component("child"),
                },
            },
        },
    });

    const tree = context.tree = createTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id  : "child",
                    src : childMachine,
                },

                meta : {
                    component : component("one"),
                },

                on : {
                    NEXT : "two",
                },
            },

            two : {
                meta : {
                    component : component("two"),
                },
            },
        },
    });

    const { tree : before } = await tree();

    tree.send({ type : "NEXT" });

    const { tree : after } = await tree();

    return { before, after };
}

async function removeDataOnceTheInvokedChildMachineIsHaltedViaOnDone(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    component : component("child"),
                },

                on : {
                    NEXT : "done",
                },
            },

            done : {
                type : "final",
            },
        },
    });

    const tree = context.tree = createTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id     : "child",
                    src    : childMachine,
                    onDone : "two",
                },

                meta : {
                    component : component("one"),
                },
            },

            two : {
                meta : {
                    component : component("two"),
                },
            },
        },
    });

    const { tree : before } = await tree();

    tree.builder.broadcast({ type : "NEXT" });

    const { tree : after } = await tree();

    return { before, after };
}

async function rebuildOnChildMachineTransitions(context: any) {
    const childMachine = createMachine({
        initial : "child1",

        states : {
            child1 : {
                meta : {
                    component : component("child1"),
                },

                on : {
                    NEXT : "child2",
                },
            },

            child2 : {
                meta : {
                    component : component("child2"),
                },
            },
        },
    });

    const tree = context.tree = createTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id  : "child",
                    src : childMachine,
                },

                meta : {
                    component : component("one"),
                },
            },
        },
    });

    const { tree : before } = await tree();

    tree.builder.broadcast({ type : "NEXT" });

    const { tree : after } = await tree();

    return { before, after };
}

async function rebuildOnParentTransitions(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    component : component("child1"),
                },
            },
        },
    });

    const tree = context.tree = createTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id  : "child",
                    src : childMachine,
                },

                meta : {
                    component : component("one"),
                },

                initial : "oneone",

                states : {
                    oneone : {
                        meta : {
                            component : component("oneone"),
                        },

                        on : {
                            NEXT : "onetwo",
                        },
                    },

                    onetwo : {
                        meta : {
                            component : component("onetwo"),
                        },
                    },
                },
            },
        },
    });

    const { tree : before } = await tree();

    tree.send({ type : "NEXT" });

    const { tree : after } = await tree();

    return { before, after };
}

async function supportNestedInvokedMachines(context: any) {
    const grandchildMachine = createMachine({
        initial : "grandchild",

        states : {
            grandchild : {
                meta : {
                    component : component("grandchild"),
                },
            },
        },
    });

    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                invoke : {
                    id  : "grandchild",
                    src : grandchildMachine,
                },

                meta : {
                    component : component("child"),
                },
            },
        },
    });

    const { tree } = await getTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id  : "child",
                    src : childMachine,
                },

                meta : {
                    component : component("one"),
                },
            },
        },
    });

    return { tree };
}

async function rebuildOnNestedInvokedMachineTransitions(context: any) {
    const grandchildMachine = createMachine({
        initial : "grandchild1",

        states : {
            grandchild1 : {
                meta : {
                    component : component("grandchild1"),
                },

                on : {
                    NEXT : "grandchild2",
                },
            },

            grandchild2 : {
                meta : {
                    component : component("grandchild2"),
                },
            },
        },
    });

    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                invoke : {
                    id  : "grandchild",
                    src : grandchildMachine,
                },

                meta : {
                    component : component("child"),
                },
            },
        },
    });

    const tree = context.tree = createTree({
        initial : "one",

        states : {
            one : {
                invoke : {
                    id  : "child",
                    src : childMachine,
                },

                meta : {
                    component : component("one"),
                },
            },
        },
    });

    const { tree : before } = await tree();

    tree.builder.broadcast({ type : "NEXT" });

    const { tree : after } = await tree();

    return { before, after };
}

async function buildATreeEvenWhenTheChildMachineImmediatelyFiresANoopEvent(context: any) {
    const childMachine = createMachine({
        initial : "one",

        // This invoke always fires an event immediately, but it doesn't cause a transition
        // so when _onState in the component tree instance is triggered changed is set to false,
        // even though the tree for that service has never been built. Added a check to ignore
        // changed and build anyways if it's the first time the service has been seen.
        invoke : [{
            id  : "invoke",
            src : fromCallback(({ sendBack }) => sendBack({ type : "ONE" })),
        }],

        states : {
            one : {
                meta : {
                    component : component("child-one"),
                },
            },
        },
    });

    const { tree } = await getTree({
        id      : "parent",
        initial : "one",

        states : {
            one : {
                invoke : {
                    id  : "child",
                    src : childMachine,
                },
            },
        },
    });

    return { tree };
}
