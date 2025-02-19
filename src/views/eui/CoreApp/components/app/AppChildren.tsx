import React from "react";

const AppChildren = ({ children }: any) => {
    return (
        <>
            {Array.isArray(children) && children.map((child: any, index: any) => {
                const Component = child.component.default || child.component;
                return (
                    <Component key={child.key || child.id || index} {...child.props}>
                        {child.children && <AppChildren children={child.children} />}
                        {child.children && !Array.isArray(child.children) && child.children}
                    </Component>
                );
            })}
        </>
    );
};

export default AppChildren;
