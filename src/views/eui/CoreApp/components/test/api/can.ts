import { createTree } from "../util/trees.js";

import single from "./specimens/single.js";
import child from "./specimens/child.js";
import noComponents from "./specimens/no-components.js";

async function CheckRoot(context: any) {
    const tree = context.tree = createTree(single);

    let { extra }: any = await tree();

    return { tree, extra };
}

async function CheckChild(context: any) {
    const tree = context.tree = createTree(child);

    const { extra } : any = await tree();

    return { tree, extra };
}

async function CheckNoComponents(context: any) {
    const tree = context.tree = createTree(noComponents);

    let { extra }: any = await tree();

    return { tree, extra };
}

