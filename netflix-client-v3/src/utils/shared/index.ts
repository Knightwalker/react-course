/**
 * Utility function, which gives a convinient way to introduce a deliberate delay in the execution of code.
 *
 * @param {number} ms The number of milliseconds to wait before resolving the Promise.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 * @description
 * Use cases include:
 * - Debouncing or throttling user actions.
 * - Creating sequential animations or transitions.
 * - Simulating network or processing delays.
 * - Staggering the loading of page elements.
 * @example
 * // Use in an async function to introduce a delay:
 * const fetchDataWithDelay = async() => {
 *   await wait(1000); // Wait for 1 second
 *   // Fetch data from the server
 * }
 */
const wait = (ms: number): Promise<undefined> => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

export {
    wait
};