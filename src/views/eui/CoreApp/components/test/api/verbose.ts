import { spyOn, restoreAll } from "nanospy";

import { createTree } from "../util/trees.js";
import { snapshot } from "../util/snapshot.js";

import child from "./specimens/child.js";


async function InformationLogger(context: any) {
    const tree = context.tree = createTree(child, { verbose : true });

    return { tree };
}

