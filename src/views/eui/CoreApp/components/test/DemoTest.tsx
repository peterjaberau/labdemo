import React, { useEffect, useState } from 'react'
import { EuiSuperSelect, EuiHealth, EuiFormRow } from "@elastic/eui";
import { functionMapping } from './basic.js'


// Components
const Root = ({ children }: any) => (
    <div style={{ border: "2px solid blue", padding: "10px", margin: "10px" }}>
        <h1>Root Component</h1>
        {children}
    </div>
);

const Child = ({ children }: any) => (
    <div style={{ border: "2px solid green", padding: "10px", margin: "10px" }}>
        <h2>Child Component</h2>
        {children}
    </div>
);

const GrandChild = () => (
    <div style={{ border: "2px solid red", padding: "10px", margin: "10px" }}>
        <h3>GrandChild Component</h3>
    </div>
);


export const DemoTest = () => {
    const options = [
        {
            value: "basicComponentsTree",
            inputDisplay: "basicComponentsTree",
        },
        {
            value: "basicComponentTreeWithChildMachines",
            inputDisplay: "basicComponentTreeWithChildMachines",
        },
        {
            value: "basicComponentTreeWithArrays",
            inputDisplay: "basicComponentTreeWithArrays",
        },
        {
            value: "basicComponentTreeWithRootComponents",
            inputDisplay: "basicComponentTreeWithRootComponents",
        },
        {
            value: "basicComponentTreeWithProps",
            inputDisplay: "basicComponentTreeWithProps",
        },
        {
            value: "basicComponentTreeWithParallelStates",
            inputDisplay: "basicComponentTreeWithParallelStates",
        },
        {
            value: "basicComponentTreeWithNestedParallelStatesStableTrue",
            inputDisplay: "basicComponentTreeWithNestedParallelStatesStableTrue",
        },
        {
            value: "basicComponentTreeWithNestedParallelStatesStableFalse",
            inputDisplay: "basicComponentTreeWithNestedParallelStatesStableFalse",
        },
        {
            value: "basicComponentTreeWithArbitraryIds",
            inputDisplay: "basicComponentTreeWithArbitraryIds",
        },

        {
            value: "basicComponentTreeWithHoles",
            inputDisplay: "basicComponentTreeWithHoles",
        },

        {
            value: "basicComponentTreeRebuildOnMachineTransition",
            inputDisplay: "basicComponentTreeRebuildOnMachineTransition",
        },

        {
            value: "basicComponentTreeRebuildWithoutChanges",
            inputDisplay: "basicComponentTreeRebuildWithoutChanges",
        },

        {
            value: "basicComponentTreeRebuildStableOrderChangeBefore",
            inputDisplay: "basicComponentTreeRebuildStableOrderChangeBefore",
        },

        {
            value: "basicComponentTreeRebuildStableOrderChangeAfter",
            inputDisplay: "basicComponentTreeRebuildStableOrderChangeAfter",
        },

        {
            value: "basicComponentTreeCleanup",
            inputDisplay: "basicComponentTreeCleanup",
        },
    ];
    const [value, setValue] = useState(options[1].value);

    const [data, setData] = useState({});

    const onChange = (value: any) => {
        setValue(value);
        const res = functionMapping[value]();

        setData(res);
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
        <EuiFormRow
            label={"Status - " + value}
        >
            <EuiSuperSelect
                fullWidth={true}
                options={options}
                valueOfSelected={value}
                onChange={(value) => onChange(value)}
            />
        </EuiFormRow>
        </>
    );
};
