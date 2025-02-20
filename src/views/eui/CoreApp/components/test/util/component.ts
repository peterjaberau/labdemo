// eslint-disable-next-line prefer-arrow-callback
const component = (name: any) => Object.defineProperty(function() {
    return name;
}, "name", { value : name });

export default component;
