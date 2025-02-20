// @ts-ignore
import inspect from "object-inspect";
import * as assert from "uvu/assert";
import { compare } from "uvu/diff";
import dedent from "dedent";
// @ts-ignore
import strip from "strip-ansi";

const OPTIONS = { quoteStyle : "double", indent : 4, depth : 8 };

export const serialize: any = (object: any, options: any) => inspect(object, { ...OPTIONS, ...options });

export const snapshot = (object: any, out: any) => assert.fixture(serialize(object), dedent(out));

export const diff = (a: any, b: any, out: any) => {
    const comparison = compare(serialize(a), serialize(b));

    const output = strip(comparison)
    .replaceAll("·", " ")
    .replaceAll("→", "     ");

    return assert.fixture(dedent(output), dedent(out));
};
