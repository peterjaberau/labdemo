import component from "./util/component";
import { asyncLoad } from "./util/async";
import { getTree, createTree, createMachine } from './util/trees'


async function supportSyncLoadMethods(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    load : () => component("child"),
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

async function passContextAndEventParams(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    load : (context: any, event: any): any => ({ ctx : context, event }),
                },
            },
        },
    });

    const { tree } = await getTree({
        initial : "one",
        context : "context",

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

async function supportReturningAComponentAndProps(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    load : () => [ component("child"), { props : true }],
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

async function supportAsyncLoadMethods(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    load : asyncLoad(component("child")),
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

async function supportAsyncLoadReturningSyncComponentAndSyncProps(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    load : asyncLoad([ component("child"), { props : true }]),
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

async function supportAsyncLoadReturningAsyncComponentAndSyncProps(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    load : asyncLoad([ asyncLoad(component("child"))(), { props : true }]),
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

async function supportAsyncLoadReturningSyncComponentAndAsyncProps(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    load : asyncLoad([ component("child"), asyncLoad({ props : true })() ]),
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

async function supportNestedAsyncLoadMethods(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    load : asyncLoad(component("child")),
                },

                initial : "grandchild",

                states : {
                    grandchild : {
                        meta : {
                            load : asyncLoad(component("grandchild"), 16),
                        },
                    },
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

async function ignoreStaleTreesIfComponentLoadsHadntCompleted(context: any) {
    const childMachine = createMachine({
        initial : "child",

        states : {
            child : {
                meta : {
                    // whoops never resolves!
                    load : () => new Promise(() => {}),
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

                after : {
                    100 : "two",
                },
            },

            two : {
                meta : {
                    component : component("two"),
                },
            },
        },
    });

    // Purposefully not awaiting this, it'll never resolve!
    tree();

    const { tree : result } = await tree();

    return { tree : result };
}

async function onlyCallLoadWhenAStateIsEntered(context: any) {
    let runs = 0;

    const tree = context.tree = createTree({
        initial : "one",
        context : "context",

        states : {
            one : {
                initial : "child1",

                meta : {
                    load : () => {
                        ++runs;

                        return component("one");
                    },
                },

                states : {
                    child1 : {
                        on : {
                            NEXT : "child2",
                        },
                    },

                    child2 : {},
                },
            },
        },
    });

    await tree();


    tree.send({ type : "NEXT" });

    await tree();

    return { runs, tree };

}

async function reRunLoadFunctionsWhenTransitioningBackToAState(context: any) {
    let runs: any = [];

    const tree = context.tree = createTree({
        initial : "one",

        states : {
            one : {
                meta : {
                    load : () => {
                        runs.push("one");

                        return component("one");
                    },
                },

                on : {
                    NEXT : "two",
                },
            },

            two : {
                meta : {
                    load : () => {
                        runs.push("two");

                        return component("two");
                    },
                },

                on : {
                    NEXT : "one",
                },
            },
        },
    });

    await tree();



    runs = [];

    tree.send({ type : "NEXT" });

    await tree();



    runs = [];

    tree.send({ type : "NEXT" });

    await tree();

   return { runs, tree };
}

async function allowTheCachingToBeDisabledGlobally(context: any) {
    let runs: any = [];

    const tree = context.tree = createTree({
        initial : "one",

        states : {
            one : {
                initial : "oneone",

                meta : {
                    load : () => {
                        runs.push("one");

                        return component("one");
                    },
                },

                states : {
                    oneone : {
                        on : {
                            NEXT : "onetwo",
                        },

                        meta : {
                            load : () => {
                                runs.push("oneone");

                                return component("oneone");
                            },
                        },
                    },

                    onetwo : {},
                },
            },
        },
    }, { cache : false });

    await tree();



    runs = [];

    tree.send({ type : "NEXT" });

    await tree();

    return { runs, tree };

}

async function allowTheCachingToBeDisabledLocally(context: any) {
    let runs: any = [];

    const tree = context.tree = createTree({
        initial : "one",

        states : {
            one : {
                initial : "oneone",

                meta : {
                    cache : false,
                    load  : () => {
                        runs.push("one");

                        return component("one");
                    },
                },

                states : {
                    oneone : {
                        on : {
                            NEXT : "onetwo",
                        },

                        meta : {
                            load : () => {
                                runs.push("oneone");

                                return component("oneone");
                            },
                        },
                    },

                    onetwo : {},
                },
            },
        },
    });

    await tree();


    runs = [];

    tree.send({ type : "NEXT" });

    await tree();

    return { runs, tree };

}

async function ignoreFalseyComponents(context: any) {
    const { tree } = await getTree({
        initial : "one",

        states : {
            one : {
                meta : {
                    load : () => [ undefined, 0 ],
                },
            },
        },
    });

    return { tree };
}

