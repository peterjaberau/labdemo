// import * as assert from 'uvu/assert'
//
// import { componentHelper } from '@/machines/core/component-helper.js'
//
// import component from './util/component.js'
// import { asyncValue, asyncLoad } from './util/async.js'
// import { createTree, getTree } from './util/trees.js'
// import { single } from 'rxjs'
//
// async function namedExportHelperEntrypoint(context: any) {
//     const tree = (context.tree = createTree(single))
//
//     let { extra } = await tree()
//
//     return { tree, extra }
// }
//
// const NamedComponentsList = [
//     ['basic component', { component: One }, One],
//     [
//         'basic component + basic props',
//         { component: One, props: properties },
//         { component: One, props: properties },
//     ],
//     [
//         'basic component + arrow fn props',
//         { load: () => [One, properties] },
//         { component: One, props: () => properties },
//     ],
//     ['arrow function', { load: () => One }, () => One],
//     [
//         'arrow function + basic props',
//         { load: () => [One, properties] },
//         { component: () => One, props: properties },
//     ],
//     [
//         'arrow function + arrow fn props',
//         { load: () => [One, properties] },
//         { component: () => One, props: () => properties },
//     ],
//     ['async arrow function', { load: () => [asyncValue(One)] }, asyncLoad(One)],
//     [
//         'async arrow function + basic props',
//         { load: () => [asyncValue(One), properties] },
//         { component: asyncLoad(One), props: properties },
//     ],
//     [
//         'async arrow function + arrow fn props',
//         { load: () => [asyncValue(One), properties] },
//         { component: asyncLoad(One), props: () => properties },
//     ],
// ]
//
// async function iterateNamedExportHelperEntrypoint(context) {
//     const One = component('one')
//     const properties = { foo: 'bar' }
//
//     const results = []
//
//     for (const [name, meta, helpered] of NamedComponentsList) {
//         const { tree: basic } = await getTree({
//             initial: 'one',
//
//             states: {
//                 one: {
//                     meta,
//                 },
//             },
//         })
//
//         const { tree: sugar } = await getTree({
//             initial: 'one',
//
//             states: {
//                 one: componentHelper(helpered),
//             },
//         })
//
//         results.push({ name, basic, sugar })
//     }
//
//     return results
// }
//
// function shouldMaintainExistingMetaProperties(context) {
//     const node = componentHelper(component('one'), {
//         meta: {
//             foo: 'bar',
//             baz: true,
//         },
//     })
//
//     return node
// }
