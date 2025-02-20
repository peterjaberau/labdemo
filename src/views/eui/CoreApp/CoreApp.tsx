import cache from '@/cache/iconCache'
import { EuiProvider, EuiThemeProvider } from '@elastic/eui'
import App from './App'
import { DemoMachineProvider, DemoMachineCardProvider } from '@/views/eui/CoreApp/components/demo/DemoMachineContext'

const CoreApp = () => {
    return (
        <DemoMachineCardProvider>
        <DemoMachineProvider>
            <EuiProvider cache={cache}>
                <EuiThemeProvider>
                    <App />
                </EuiThemeProvider>
            </EuiProvider>
        </DemoMachineProvider>
        </DemoMachineCardProvider>
    )
}

export default CoreApp
