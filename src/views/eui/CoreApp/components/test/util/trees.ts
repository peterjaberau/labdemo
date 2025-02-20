import { createMachine as xstateCreate, createActor } from "xstate";
import { ComponentTree } from "@/machines/core/component-tree.js";

const deferred = () => {
    let resolve: any;
    let reject: any;

    const p : any= new Promise((ok, no) => {
        resolve = ok;
        reject = no;
    });

    p.resolve = resolve;
    p.reject = reject;

    return p;
};

// Watch for trees to be built, and provide an easy way
// to await each value
export const trees = (service: any, options = {}, function_ = false) => {
    const responses: any = [];
    let index = 0;
    let p: any;
    let resolved: any;

    const respond = () => {
        if(resolved || index >= responses.length || !p) {
            return;
        }

        const response = responses[index++];

        p.resolve({ tree : response[0], extra : response[1] });
    };

    const out = () => {
        p = deferred();
        resolved = false;

        respond();

        return p.then((data: any) => {
            resolved = true;

            return data;
        });
    };

    out.responses = responses;

    // Push new tree states onto array and respond if a request is waiting
    out.builder = new ComponentTree(service, (...other: any) => {
        responses.push(other);

        if(function_) {
            // @ts-ignore
            function_(other);
        }

        respond();
    }, options);

    out.send = (...arguments_: any) => service.send(...arguments_);

    out.service = service;

    service.start();

    return out;
};

export const createMachine = (definitions: any) => (
    definitions.__xstatenode ?
        definitions :
        xstateCreate({ ...definitions })
);

export const createTree = (definition: any, ...rest: any) => {
    const machine = createMachine({ id : "test", ...definition });
    const service = createActor(machine, { id : machine.id || "test" });

    return trees(service, ...rest);
};

export const getTree = async (definition: any, ...rest: any) => {
    const generator = createTree(definition, ...rest);

    const result = await generator();

    generator.builder.teardown();

    return result;
};

export const waitForPath = async (tree: any, path: any) => {
    let found = false;
    let value;

    do {
        // eslint-disable-next-line no-await-in-loop
        value = await tree();

        const searching = [ ...value.tree ];

        while(searching.length > 0) {
            const item = searching.shift();

            if(item.path === path) {
                found = true;
                break;
            }

            searching.push(...item.children);
        }
    } while(!found);

    return value;
};
