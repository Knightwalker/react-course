import { useRef } from "react";
import axios from "axios";

const usePost = () => {
    const isMounted = useRef(true);
    const abortController = useRef(new AbortController());

    const makeRequest = async (url, payload) => {
        try {
            const response = await axios.post(url, {
                signal: abortController.current.signal,
                headers: {
                    "Content-Type": "application/json"
                },
                data: payload
            });
            if (!isMounted.current) {
                throw new Error("canceled");
            }
            const data = response.data;
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

export default usePost;
