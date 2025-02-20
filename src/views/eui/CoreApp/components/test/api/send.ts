import { createTree, waitForPath } from "../util/trees.js";
import { diff } from "../util/snapshot.js";

import single from "./specimens/single.js";
import child from "./specimens/child.js";

async function CallableMethod(context: any) {
    const tree = context.tree = createTree(single);

    return { tree };
}

async function SendToRoot(context: any) {
    const tree = context.tree = createTree(single);

    const { tree : one }: any = await tree();

    tree.builder.send({ type : "NEXT" });

    const { tree : two } = await waitForPath(tree, "two");

    return { one, two };
}

async function SendToChild(context: any) {
    const tree = context.tree = createTree(child);

    const { tree : one }: any = await tree();

    tree.builder.send({ type : "NEXT" });

    const { tree : two } = await waitForPath(tree, "root.two");

    return { one, two };
}

