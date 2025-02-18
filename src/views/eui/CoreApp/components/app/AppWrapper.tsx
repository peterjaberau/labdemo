import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { EuiPageTemplate, EuiPanel } from '@elastic/eui'
import { AppHeader } from '@/views/eui/CoreApp/components/app/AppHeader'
import { contentItems, componentMapping } from '@/views/eui/mapping'
import { defaultContentRenderKey } from '@/views/eui/constants'

interface AppWrapperProps {
    [key: string]: any
}

const AppWrapper: React.FC<AppWrapperProps> = ({ ...restProps }) => {
    const location = useLocation()
    const renderKey =
        new URLSearchParams(location.search).get('render') ||
        defaultContentRenderKey
    const Component = componentMapping[renderKey]
    const getProps: any = contentItems.find((s) => s.key === renderKey)?.props

    return (
        <>
            <EuiPageTemplate
                // panelled={false}
                // restrictWidth={false}
                // bottomBorder={true}
                // grow={false}
                // responsive={['xs', 's']}
                // paddingSize="m"
                {...restProps}
                { ...getProps?.page }
            >
                <AppHeader {...getProps?.pageHeader} />
                <EuiPageTemplate.Section grow={false} paddingSize={'l'}>
                        <Component />
                </EuiPageTemplate.Section>
            </EuiPageTemplate>
        </>
    )
}

export default AppWrapper
