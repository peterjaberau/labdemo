import { createTree, waitForPath } from "../util/trees";

import single from "./specimens/single";
import grandchild from "./specimens/grandchild";

async function SendToRoot(context: any) {
    const tree = context.tree = createTree(single);

    const { tree : one }: any = await tree();

    tree.builder.send({ type : "NEXT" });

    const { tree : two } = await waitForPath(tree, "two");

   return { one, two };
}

async function SendToChild(context: any) {
    const tree = context.tree = createTree(grandchild);

    const { tree : one }: any = await tree();

    tree.builder.send({ type : "NEXT" });

    const { tree : two } = await waitForPath(tree, "grandchild.two");

    return { one, two };
}


