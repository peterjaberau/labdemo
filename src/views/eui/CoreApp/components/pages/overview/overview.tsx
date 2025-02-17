import { OverviewPageHeader } from './overview_page_header'
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiPage,
    EuiPageSection,
    EuiPageTemplate,
} from '@elastic/eui'
import React from 'react'
import { EuiSkeletonText, EuiPageSidebar, EuiCard, EuiIcon } from '@elastic/eui'
import { useLocation } from 'react-router-dom'
import { contentItems } from '@/views/eui/CoreApp/AppRoutes'

const basePath = '/eui/core-app'

const componentMapping: { [key: string]: React.ComponentType } = {}
contentItems.forEach((item) => {
    componentMapping[item.key] = item.component
})

export const Overview = () => {
    const location = useLocation()
    // const pathKey = location.pathname.replace(`${basePath}/`, '')
    // const Component = componentMapping[pathKey] || WithSimpleContent

    const queryParams = new URLSearchParams(location.search)
    const renderKey = queryParams.get('render') || 'simple-content'
    const Component = componentMapping[renderKey]

    return (
        <>
            <EuiPageTemplate
                panelled={false}
                restrictWidth={true}
                bottomBorder={true}
                grow={false}
                responsive={['xs', 's']}
                paddingSize="m"
            >
                <OverviewPageHeader />

                <EuiPageTemplate.Section grow={false}>
                    <Component />
                </EuiPageTemplate.Section>

                {/*<EuiPageTemplate.Section grow={false}>*/}
                {/*    <WithBasicCards />*/}

                {/*</EuiPageTemplate.Section>*/}

                {/*<EuiPageTemplate.Section grow={false}>*/}
                {/*    <WithTabbedContent />*/}

                {/*</EuiPageTemplate.Section>*/}

                {/*<EuiPageTemplate.Section grow={false}>*/}
                {/*    <WithTabCards />*/}

                {/*</EuiPageTemplate.Section>*/}
            </EuiPageTemplate>
        </>
    )
}

/*


<EuiPageHeader
  bottomBorder="extended"
  breadcrumbs={[
    {
      href: '#',
      text: 'Breadcrumb 1'
    },
    {
      href: '#',
      text: 'Breadcrumb 2'
    },
    {
      href: '#',
      text: 'Current'
    }
  ]}
  description="Example of a description."
  iconType="logoKibana"
  pageTitle="Page title"
  rightSideItems={[
    <EuiButton fill>Add something</EuiButton>,
    <EuiButton>Do something</EuiButton>
  ]}
  tabs={[
    {
      isSelected: true,
      label: 'Tab 1'
    },
    {
      label: 'Tab 2'
    }
  ]}
/>



 */

/*


<EuiPageTemplate>
                <OverviewPageHeader />
                <EuiPageTemplate.Section>
                    <EuiFlexGroup>
                        <EuiFlexItem>Content grid item</EuiFlexItem>
                        <EuiFlexItem>Content grid item</EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPageTemplate.Section>
            </EuiPageTemplate>

 */
