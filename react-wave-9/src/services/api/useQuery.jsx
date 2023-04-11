import { useRef } from "react";
import { ENUM_REQUEST_STATUS } from "../enums";

let cache = {};

const useQuery = () => {
    const isMounted = useRef(true);
    const abortControllerInstance = useRef(new AbortController());

    const makeRequest = (url) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Check Cache: Check if we already have this data stored
                if (typeof cache[url] !== "undefined") {
                    return resolve(cache[url]);
                }
                // Request: We fire a request
                // Cancel Request: We also provide a mechanism for cancelling the request
                const response = await fetch(url, {
                    signal: abortControllerInstance.current.signal
                });
                if (!response.ok) {
                    throw new Error(ENUM_REQUEST_STATUS.hasErrors);
                }
                const result = await response.json();
                const data = result.results;
                // Cancel Request: We provide a fall-back mechanism for cancelling the request
                if (!isMounted.current) {
                    throw new Error(ENUM_REQUEST_STATUS.isCancelled);
                }
                // Data: Store the data in cache and return it
                cache[url] = data;
                return resolve(data);
            } catch (err) {
                if (err.message === ENUM_REQUEST_STATUS.hasErrors) {
                    // TODO: log file
                }
                return reject(err);
            }
        });
    }

    const cancelRequest = () => {
        isMounted.current = false;
        abortControllerInstance.current.abort("isCancelled");
    }

    return [makeRequest, cancelRequest];
};

export default useQuery;
