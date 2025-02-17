import { lazy } from 'react'
import { EUI_PREFIX_PATH } from '@/constants/route.constant'

import type { Routes } from '@/@types/routes'
import { ADMIN, USER } from '@/constants/roles.constant'

const euiRoute: Routes = [
    {
        key: 'eui.coreApp',
        path: `${EUI_PREFIX_PATH}/core-app`,
        component: lazy(() => import('@/views/eui/CoreApp')),
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        }
    },


]

export default euiRoute
