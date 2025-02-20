import { createTree } from "../util/trees.js";

import parallel from "./specimens/parallel.js";
import child from "./specimens/child.js";
import noComponents from "./specimens/no-components.js";

async function CheckRoot(context: any) {
    const tree = context.tree = createTree(parallel);

    let { extra }: any = await tree();

    return { tree, extra };
}

async function CheckChild(context: any) {
    const tree = context.tree = createTree(child);

    const { extra }: any = await tree();

    return { tree, extra };
}

async function CheckNoComponents(context: any) {
    const tree = context.tree = createTree(noComponents);

    let { extra }: any = await tree();

    return { tree, extra };
}
