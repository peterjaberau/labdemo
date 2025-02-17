
export function withTimeout<T>({
  promise,
  timeout,
  errorMessage,
}: {
  promise: Promise<T>;
  timeout: number;
  errorMessage: string;
}) {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => setTimeout(() => reject(new Error(errorMessage)), timeout)),
  ]) as Promise<T>;
}
