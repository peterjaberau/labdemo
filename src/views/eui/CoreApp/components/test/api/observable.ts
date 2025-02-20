import { createActor } from "xstate";
import { ComponentTree } from '@/machines/core/component-tree.js';
import { createTree } from "../util/trees.js";

import single from "./specimens/single.js";


async function ImmediateCallback(context: any) {
    const xct: any = new ComponentTree(createActor(single));

    let calls = 0;
    let out;

    xct.subscribe((result: any) => {
        ++calls;

        out = result;
    });

    return { xct, calls, out };
}

async function CallbackOnRunFinish(context: any) {
    const tree: any = context.tree = createTree(single);

    let calls = 0;
    let out;

    tree.builder.subscribe((result: any) => {
        ++calls;

        out = result;
    });

    await tree();

    return { tree, calls, out };
}

async function ReturnUnsubscribe(context: any) {
    const tree = context.tree = createTree(single);

    let calls: any = 0;

    const unsub = tree.builder.subscribe(() => ++calls as any);

    await tree();

    unsub();

    tree.send({ type : "NEXT" });

    await tree();

    return { calls };
}

