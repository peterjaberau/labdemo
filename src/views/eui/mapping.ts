import React from 'react'
import WithSimpleContent from '@/views/eui/CoreApp/components/pages/withSimpleContent'
import WithBasicCards from '@/views/eui/CoreApp/components/pages/withBasicCards'
import WithTabCards from '@/views/eui/CoreApp/components/pages/WithTabCards'
import WithTabbedContent from '@/views/eui/CoreApp/components/pages/WithTabbedContent'
import WithGridSearch from '@/views/eui/CoreApp/components/pages/withGridSearch'
import WithTableSearch from '@/views/eui/CoreApp/components/pages/withTableSeach'
import AppDemo from '@/views/eui/CoreApp/components/demo/AppDemo'

const defaultProps = {
    page: {
        panelled: false,
        restrictWidth: true,
        bottomBorder: true,
        grow: false,
        responsive: ['xs', 's'],
        paddingSize: 'm'
    },
    pageHeader: {
        title: 'untitled',
        iconType: 'logoElastic'
    }
}

export const contentItems = [
    {
        key: 'simple-content',
        component: WithSimpleContent,
        title: 'Simple',
        props: {
            ...defaultProps,
            ...{
                pageHeader: {
                    title: 'Simple Content',
                    iconType: 'globe'
                }
            }
        },
    },
    {
        key: 'basic-cards',
        component: WithBasicCards,
        title: 'Basic Cards',
        props: {
            ...defaultProps,
            ...{
                pageHeader: {
                    title: 'Basic Cards',
                    iconType: 'dashboardApp'
                }
            }
        },
    },
    {
        key: 'tab-cards',
        component: WithTabCards,
        title: 'Tab Cards',
        props: {
            ...defaultProps,
            ...{
                pageHeader: {
                    title: 'Tab Cards',
                    iconType: 'node'
                }
            }
        },
    },
    {
        key: 'tabbed-content',
        component: WithTabbedContent,
        title: 'Tabbed Content',
        props: {
            ...defaultProps,
            ...{
                pageHeader: {
                    title: 'Tabbed Content',
                    iconType: 'documentation'
                }
            }
        },
    },
    {
        key: 'grid-search',
        component: WithGridSearch,
        title: 'Grid Search',
        props: {
            ...defaultProps,
            ...{
                pageHeader: {
                    title: 'Grid Search',
                    iconType: 'apps'
                }
            }
        },
    },
    {
        key: 'table-search',
        component: WithTableSearch,
        title: 'Table Search',
        props: {
            ...defaultProps,
            ...{
                page: {
                    panelled: true,
                    restrictWidth: false
                },
                pageHeader: {
                    title: 'Table Search',
                    iconType: 'visualizeApp'
                }
            }
        },
    },
    {
        key: 'app-demo',
        component: AppDemo,
        title: 'App Demo',
        props: {
        },
    },
] as const

export const componentMapping: Record<string, React.ComponentType> =
    Object.fromEntries(
        contentItems.map(({ key, component }) => [key, component]),
    )
