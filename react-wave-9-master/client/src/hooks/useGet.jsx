import { useRef } from "react";
import axios from "axios";

const cache = {};

const useGet = () => {
    const isMounted = useRef(true);
    const abortController = useRef(new AbortController());

    const makeRequest = async (url) => {
        try {
            if (typeof cache[url] !== "undefined") {
                return cache[url];
            }
            const response = await axios.get(url, {
                signal: abortController.current.signal,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!isMounted.current) {
                throw new Error("canceled");
            }
            const data = response.data;
            cache[url] = data;
            return data;
        } catch (error) {
            throw error;
        }
    }

    const cancelRequest = () => {
        isMounted.current = false;
        abortController.current.abort();
    }

    return [makeRequest, cancelRequest]
};

export default useGet;
