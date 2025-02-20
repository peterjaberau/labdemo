import React, { useState, useEffect } from 'react';
import { useDemoMachineCard } from '@/views/eui/CoreApp/components/demo/demoMachineHook'
import { ComponentTree } from '@/machines/core/component-tree'
import { EuiCodeBlock, EuiAccordion, useGeneratedHtmlId } from '@elastic/eui'
import { EuiButton } from '@elastic/eui'


const TreeRenderer = ({ components }: any) => {
    const renderTree = (items:any) =>
        items.map(({ component: Component, props, children, path }: any) => (
            <Component key={path} {...props}>
                {children.length > 0 && renderTree(children)}
            </Component>
        ));

    return renderTree(components);
};

const AppDemoCard = () => {

    const { actorCard, stateCard } = useDemoMachineCard();
    const [components, setComponents] = useState([]);

    const simpleAccordionId = useGeneratedHtmlId({ prefix: 'simpleAccordion' });

    useEffect(() => {
        new ComponentTree(actorCard, (tree: any) => {
            setComponents(tree);
        });

    }, [actorCard]);

    useEffect(() => {
        console.log('---componentsCard----', components);
    }, [components]);

    return (
        <TreeRenderer components={components} />
    );
};

export default AppDemoCard;

