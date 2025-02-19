import React from 'react';
import { EuiAccordion, EuiCard, EuiCodeBlock, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'

const RecursiveComponent = ({ component: Component, props, children }: any) => (
    <Component {...props}>
        {children && children.map((child: any, index: any) => (
            <RecursiveComponent key={index} {...child} />
        ))}
    </Component>
);


const ChildrenDemo = ({ children = [] }: any) => {
    return (
        <>



            <EuiCard title={'ChildDemo'} titleSize={'xs'} display={'transparent'}>
                <EuiFlexGroup direction={'column'}>
                    <EuiFlexItem>
                        {Array.isArray(children) && children.map((child: any, index: any) => {
                            const Component = child.component.default || child.component;
                            return (
                                <Component key={child.key || child.id || index} {...child.props}>
                                    {child.children && <ChildrenDemo children={child.children} />}
                                    {child.children && !Array.isArray(child.children) && child.children}
                                </Component>
                            );
                        })}
                    </EuiFlexItem>
                    <EuiFlexItem >
                        <EuiAccordion id={"child-demo"} buttonContent="Child Demo Payload" >
                            <EuiCodeBlock style={{ textAlign: 'left'}}  language="json" fontSize="m" paddingSize="m" isCopyable>
                                {JSON.stringify(children, null, 2)}
                            </EuiCodeBlock>
                        </EuiAccordion>
                    </EuiFlexItem>
                </EuiFlexGroup>

            </EuiCard>

            {/*<>*/}
            {/*    {children.map(({ component: Component, props, children }: any, index: any) => (*/}
            {/*        <Component key={index} {...props}>*/}
            {/*            {children}*/}
            {/*        </Component>*/}
            {/*    ))}*/}
            {/*</>*/}

            {/*{children.map((child: any, index: any) => (*/}
            {/*    <RecursiveComponent key={index} {...child} />*/}
            {/*))}*/}
        </>
    );
}

export default ChildrenDemo;


/*


{#each children as { component, props, children }}
    <svelte:component this={component.default || component} {children} {...props} />
{/each}

<script>
export let children = [];
</script>

 */
