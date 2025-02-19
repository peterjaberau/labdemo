import React from 'react'
import { useDemoMachine } from '@/views/eui/CoreApp/components/demo/demoMachineHook'
import { EuiButton } from '@elastic/eui'



const NextChildDemo = () => {
    const { actor, state } = useDemoMachine();

    function handleNext() {
        actor.send({ type: 'NEXT' });
    }

    return (
        <>
            <p>
                <EuiButton onClick={handleNext}>Next Child</EuiButton>
            </p>
        </>
    );
}
export default NextChildDemo;
