import cache from '@/cache/iconCache'
import { EuiProvider, EuiThemeProvider } from '@elastic/eui'
import App from './App'
import { DemoMachineProvider } from '@/views/eui/CoreApp/components/demo/DemoMachineContext'

const CoreApp = () => {
    return (
        <DemoMachineProvider>
            <EuiProvider cache={cache}>
                <EuiThemeProvider>
                    <App />
                </EuiThemeProvider>
            </EuiProvider>
        </DemoMachineProvider>
    )
}

export default CoreApp
