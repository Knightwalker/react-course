import { useRef } from "react";
import { ENUM_REQUEST_STATUS } from "../../enums/auth";

const useQuery = () => {
    const isMounted = useRef(true);
    const abortControllerInstance = useRef(new AbortController());

    const makeRequest = (url) => {
        return new Promise(async (resolve, reject) => {
            try {
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

const useMutate = () => {
    const isMounted = useRef(true);
    const abortControllerInstance = useRef(new AbortController());

    const makeRequest = (url, method = "POST", payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Request: We fire a request
                // Cancel Request: We also provide a mechanism for cancelling the request
                debugger;
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload),
                    signal: abortControllerInstance.current.signal
                });
                debugger;
                if (!response.ok) {
                    throw new Error(ENUM_REQUEST_STATUS.hasErrors);
                }
                debugger;
                const data = await response.json();
                // Cancel Request: We provide a fall-back mechanism for cancelling the request
                if (!isMounted.current) {
                    throw new Error(ENUM_REQUEST_STATUS.isCancelled);
                }
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

export {
    useQuery,
    useMutate
};
