import React, { ReactNode, useState } from 'react'
import { EuiPageTemplate, EuiFlexItem, EuiFlexGroup } from '@elastic/eui'

import Header from './components/ui/header'

const App = () => {
    return (
        <>
            <Header />
            <EuiPageTemplate>
                <EuiPageTemplate.Section>
                    <EuiFlexGroup>
                        <EuiFlexItem>Content grid item</EuiFlexItem>
                        <EuiFlexItem>Content grid item</EuiFlexItem>
                    </EuiFlexGroup>
                </EuiPageTemplate.Section>
            </EuiPageTemplate>
        </>
    )
}

export default App
