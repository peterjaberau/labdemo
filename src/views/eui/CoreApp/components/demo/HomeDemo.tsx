import { EuiCard } from '@elastic/eui'
import ChildrenDemo from './ChildrenDemo';

const HomeDemo = (props: any) => {
    const { children, ...rest }: any = props

    return (
        <>
            <EuiCard title={'HomeDemo'}>
                <p>HOME RENDERED AT {Date.now()}</p>
                <ChildrenDemo {...children} {...rest} />
            </EuiCard>
        </>
    )
}
export default HomeDemo
