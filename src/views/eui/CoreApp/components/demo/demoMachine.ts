import { createActor, createMachine, setup } from 'xstate'
import { EuiButton, EuiCard, EuiAccordion, EuiCodeBlock } from '@elastic/eui'
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
                component: EuiCard,
                props: {
                    title: 'Home',
                },
            },

            on: {
                NAV: 'other',
            },

            initial: 'one',

            states: {
                one: {
                    meta: {
                        component: EuiCard,
                        props: {
                            title: 'One',
                        },
                    },

                    on: {
                        NEXT: 'two',
                    },
                },

                two: {
                    meta: {
                        // load: () => import('./TwoDemo'),
                        component: EuiCard,
                        props: {
                            title: 'Two',
                        },
                    },

                    on: {
                        NEXT: 'one',
                    },
                },
            },
        },

        other: {
            meta: {
                // load: () => import('./OtherDemo'),
                component: EuiCard,
                props: {
                    title: 'Other',
                },
            },

            on: {
                NAV: 'home',
            },
        },
    },
})

export const demoMachineCard = setup({}).createMachine({
    initial: 'root',
    states: {
        root: {
            meta: {
                component: EuiCard,
                props: {
                    title: 'Level 1 Card',
                    level: 1,

                },
                children: [
                    {
                        component: EuiAccordion,
                        props: {
                            title: 'State Info',
                            children: [
                                {
                                    component: EuiCodeBlock,
                                    props: (state: any) => ({
                                        language: 'json',
                                        children: JSON.stringify(
                                            {
                                                path: 'root',
                                                state: state.value,
                                                matches: state.matches('root'),
                                                context: state.context,
                                            },
                                            null,
                                            2,
                                        ),
                                    }),
                                },
                            ]
                        },
                    },
                ],
            },
            initial: 'level2',
            states: {
                level2: {
                    meta: {
                        component: EuiCard,
                        props: {
                            title: 'Level 2 Card',
                            level: 2,
                            children: [
                                {
                                    component: EuiAccordion,
                                    props: {
                                        buttonContent: 'State Info',
                                        children: {
                                            component: EuiCodeBlock,
                                            props: (state: any) => ({
                                                language: 'json',
                                                children: JSON.stringify(
                                                    {
                                                        path: 'root.level2',
                                                        state: state.value,
                                                        matches:
                                                            state.matches(
                                                                'root.level2',
                                                            ),
                                                        context: state.context,
                                                    },
                                                    null,
                                                    2,
                                                ),
                                            }),
                                        },
                                    },
                                },
                            ],
                        },
                    },
                    type: 'parallel',
                    states: {
                        branchState: {
                            meta: {
                                component: EuiAccordion,
                                props: {
                                    buttonContent: 'State Info',
                                },
                            },
                            initial: 'code',
                            states: {
                                code: {
                                    meta: {
                                        component: EuiCodeBlock,
                                        props: {
                                            language: 'json',
                                            text: 'test'
                                        }
                                    }
                                }
                            }

                        },
                        branch1: {
                            meta: {
                                component: EuiCard,
                                props: {
                                    title: 'Level 3 Card - Branch A',
                                    level: 3,
                                    children: [
                                        {
                                            component: EuiAccordion,
                                            props: {
                                                buttonContent: 'State Info',
                                                children: {
                                                    component: EuiCodeBlock,
                                                    props: (state: any) => ({
                                                        language: 'json',
                                                        children:
                                                            JSON.stringify(
                                                                {
                                                                    path: 'root.level2.branch1',
                                                                    state: state.value,
                                                                    matches:
                                                                        state.matches(
                                                                            'root.level2.branch1',
                                                                        ),
                                                                    context:
                                                                        state.context,
                                                                },
                                                                null,
                                                                2,
                                                            ),
                                                    }),
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                            initial: 'level4',
                            states: {
                                level4: {
                                    meta: {
                                        component: EuiCard,
                                        props: {
                                            title: 'Level 4 Card - Branch A',
                                            level: 4,
                                            children: [
                                                {
                                                    component: EuiAccordion,
                                                    props: {
                                                        buttonContent:
                                                            'State Info',
                                                        children: {
                                                            component:
                                                                EuiCodeBlock,
                                                            props: (
                                                                state: any,
                                                            ) => ({
                                                                language:
                                                                    'json',
                                                                children:
                                                                    JSON.stringify(
                                                                        {
                                                                            path: 'root.level2.branch1.level4',
                                                                            state: state.value,
                                                                            matches:
                                                                                state.matches(
                                                                                    'root.level2.branch1.level4',
                                                                                ),
                                                                            context:
                                                                                state.context,
                                                                        },
                                                                        null,
                                                                        2,
                                                                    ),
                                                            }),
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                        branch2: {
                            meta: {
                                component: EuiCard,
                                props: {
                                    title: 'Level 3 Card - Branch B',
                                    level: 3,
                                    children: [
                                        {
                                            component: EuiAccordion,
                                            props: {
                                                buttonContent: 'State Info',
                                                children: {
                                                    component: EuiCodeBlock,
                                                    props: (state: any) => ({
                                                        language: 'json',
                                                        children:
                                                            JSON.stringify(
                                                                {
                                                                    path: 'root.level2.branch2',
                                                                    state: state.value,
                                                                    matches:
                                                                        state.matches(
                                                                            'root.level2.branch2',
                                                                        ),
                                                                    context:
                                                                        state.context,
                                                                },
                                                                null,
                                                                2,
                                                            ),
                                                    }),
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                            initial: 'level4',
                            states: {
                                level4: {
                                    meta: {
                                        component: EuiCard,
                                        props: {
                                            title: 'Level 4 Card - Branch B',
                                            level: 4,
                                            children: [
                                                {
                                                    component: EuiAccordion,
                                                    props: {
                                                        buttonContent:
                                                            'State Info',
                                                        children: {
                                                            component:
                                                                EuiCodeBlock,
                                                            props: (
                                                                state: any,
                                                            ) => ({
                                                                language:
                                                                    'json',
                                                                children:
                                                                    JSON.stringify(
                                                                        {
                                                                            path: 'root.level2.branch2.level4',
                                                                            state: state.value,
                                                                            matches:
                                                                                state.matches(
                                                                                    'root.level2.branch2.level4',
                                                                                ),
                                                                            context:
                                                                                state.context,
                                                                        },
                                                                        null,
                                                                        2,
                                                                    ),
                                                            }),
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
})
