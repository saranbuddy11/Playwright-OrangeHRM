export function timeoutAfter(milliseconds, message = "Operation timed out") {
    return new Promise(
        (_, reject) => {
            setTimeout(() => {
                reject(new Error(`${message} after ${milliseconds} ms`));
            }, milliseconds);
        }
    );
}