import { createActor, createMachine, setup } from 'xstate'
import { EuiButton } from '@elastic/eui'
import HomeDemo from './HomeDemo'
import OneDemo from './OneDemo'
import TwoDemo from '@/views/eui/CoreApp/components/demo/TwoDemo'

export const demoMachine = setup({
    types: {
        context: {} as any,
        events: {} as any,
    },
    actions: {},
    actors: {},
    guards: {},
}).createMachine({
    initial: 'home',
    states: {
        home: {
            meta: {
                component: HomeDemo,
            },

            on: {
                NAV: 'other',
            },

            initial: 'one',

            states: {
                one: {
                    meta: {
                        component: OneDemo,
                    },

                    on: {
                        NEXT: 'two',
                    },
                },

                two: {
                    meta: {
                        load: () => import('./TwoDemo'),
                    },

                    on: {
                        NEXT: 'one',
                    },
                },
            },
        },

        other: {
            meta: {
                load: () => import('./OtherDemo'),
            },

            on: {
                NAV: 'home',
            },
        },
    },
})
