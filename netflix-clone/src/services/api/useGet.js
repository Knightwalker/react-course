import { useRef } from "react";
import { SERVICE_STATUS_ENUM } from "../../enums";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useGet = () => {
    const isMounted = useRef(true);
    const signalRef = useRef(new AbortController());

    const makeRequest = async ({ endpoint }) => {
        const url = BASE_URL + endpoint;

        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(url, {
                    signal: signalRef.current.signal
                });
                if (!response.ok) {
                    throw new Error(SERVICE_STATUS_ENUM.ERROR);
                }
                const result = await response.json();
                const data = result.results;

                if (!isMounted.current) {
                    throw new Error(SERVICE_STATUS_ENUM.CANCELLED);
                }

                return resolve(data);
            } catch (error) {
                if ((error.message === SERVICE_STATUS_ENUM.CANCELLED) ||
                    (error?.code === 20)) {
                    return reject(new Error(SERVICE_STATUS_ENUM.CANCELLED));
                }
                return reject(SERVICE_STATUS_ENUM.ERROR);
            }
        });
    }

    const cancelRequest = () => {
        isMounted.current = false;
        signalRef.current.abort();
    }

    return [makeRequest, cancelRequest];
}

export default useGet;
