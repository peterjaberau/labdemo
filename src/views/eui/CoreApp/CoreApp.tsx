import cache from '@/cache/iconCache'
import { EuiProvider, EuiThemeProvider } from "@elastic/eui";
import App from './App'


const CoreApp = () => {
    return (
        <EuiProvider cache={cache}>
            <EuiThemeProvider>
                <App />
            </EuiThemeProvider>
        </EuiProvider>
    )
}

export default CoreApp
