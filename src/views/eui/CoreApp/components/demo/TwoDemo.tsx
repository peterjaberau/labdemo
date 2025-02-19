import NextChildDemo from './NextChildDemo'
import React from 'react'

const TwoDemo = () => {
    return (
        <>
            <p>TWO RENDERED AT {Date.now()}</p>
            <NextChildDemo />
        </>
    );
}
export default TwoDemo;
