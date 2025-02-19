import React, { useState, useEffect } from 'react';
import { useDemoMachine } from '@/views/eui/CoreApp/components/demo/demoMachineHook'
import { ComponentTree } from '@/machines/core/component-tree'
import ChildrenDemo from './ChildrenDemo';
import { EuiCodeBlock, EuiAccordion, useGeneratedHtmlId } from '@elastic/eui'
import { EuiButton } from '@elastic/eui'

const AppDemo = () => {

    const { actor, state } = useDemoMachine();

    const [components, setComponents] = useState([]);

    const simpleAccordionId = useGeneratedHtmlId({ prefix: 'simpleAccordion' });

    useEffect(() => {
        const componentTree = new ComponentTree(actor, (tree: any) => {
            console.log('---tree----', tree);
            setComponents(() => tree);
        });


    }, [actor]);

    useEffect(() => {
        console.log('---components----', components);
    }, [components]);

    return (
        <div>
            <p>LAYOUT RENDERED AT {Date.now()}</p>
            <code>{JSON.stringify(state.value)}</code>
            <p>
                <EuiButton size={'s'}  onClick={() => actor.send({ type: 'NAV' })}>Navigate</EuiButton>
            </p>
            <ChildrenDemo children={components} />
            <EuiAccordion id={"components"} buttonContent="components">
                <EuiCodeBlock  language="json" fontSize="m" paddingSize="m" isCopyable>
                    {JSON.stringify(components, null, 2)}
                </EuiCodeBlock>
            </EuiAccordion>
            <EuiAccordion id={"state"} buttonContent="State">
                <EuiCodeBlock  language="json" fontSize="m" paddingSize="m" isCopyable>
                    {JSON.stringify(state, null, 2)}
                </EuiCodeBlock>
            </EuiAccordion>


        </div>
    );
};

export default AppDemo;


/*

<script>
    import { ComponentTree } from "xstate-component-tree";

    import service from "./statechart.js";

    import Children from "./children.svelte";

    let components = [];

    new ComponentTree(service, (tree) => {
        components = tree;
    });

    service.start();
</script>

<div>
    <p>LAYOUT RENDERED AT {Date.now()}</p>

    <code>{JSON.stringify($service.value)}</code>

    <p>
        <button on:click={() => service.send({ type: "NAV" })}>Navigate</button>
    </p>

    <Children children={components} />
</div>



 */
