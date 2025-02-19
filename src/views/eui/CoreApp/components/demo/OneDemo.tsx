import NextChildDemo from "./NextChildDemo";
import React from 'react'

const OneDemo = () => {
    return (
        <>
            <p>ONE RENDERED AT {Date.now()}</p>
            <NextChildDemo />

        </>
    );
}
export default OneDemo;
