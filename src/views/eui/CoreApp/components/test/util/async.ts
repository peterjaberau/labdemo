export const asyncValue = (result: any, delay = 0) => new Promise((resolve) =>
    setTimeout(() => resolve(result), delay)
);

// @ts-ignore
export const asyncLoad = (...arguments_: any) => () => asyncValue(...arguments_ );
