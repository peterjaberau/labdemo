import React, { ReactNode, useState } from 'react'
import { EuiPageTemplate, EuiFlexItem, EuiFlexGroup } from '@elastic/eui'

import Header from './components/ui/header'
import { Overview } from './components/pages/overview/overview'

const App = () => {
    return (
        <>
            <Header />
            <Overview />
        </>
    )
}

export default App
