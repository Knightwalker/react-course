import { useEffect, useState, useRef } from "react";

type TQueryStatus = "initial" | "loading" | "success" | "error";

type TUseQueryProps<TData> = {
    queryKey: (string | number | boolean)[],
    queryFn: (signal: AbortSignal) => Promise<TData>,
    enabled?: boolean
};

const cache: Record<string, unknown> = {};

const useQuery = <TData, TError extends { message: string }>({
    queryKey,
    queryFn,
    enabled = true
}: TUseQueryProps<TData>) => {
    const [status, setStatus] = useState<TQueryStatus>("initial");
    const [data, setData] = useState<TData | null>(null);
    const [error, setError] = useState<TError | null>(null);
    const [isInitial, setIsInitial] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const isMounted = useRef(true);
    const abortControllerInstance = useRef<AbortController | null>(null);
    const isLoadingRef = useRef(false);
    
    const cancelRequest = () => {
        if (!abortControllerInstance.current) {
            return;
        }
        abortControllerInstance.current.abort();
    };
    
    const cacheKey = JSON.stringify(queryKey);
    
    useEffect(() => {
        if (!enabled) {
            return;
        };
        
        const fetchDataAsync = async () => {
            debugger;
            if (cache[cacheKey]) {
                console.log(cache);
                setData(cache[cacheKey] as TData);
                setStatus("success");
                setIsInitial(false);
                setIsLoading(false);
                setIsSuccess(true);
                return;
            };

            setStatus("loading");
            setIsInitial(false);
            setIsLoading(true);
            setIsSuccess(false);
            setIsError(false);
            
            if (abortControllerInstance.current) {
                abortControllerInstance.current.abort();
            };
            abortControllerInstance.current = new AbortController();
            isLoadingRef.current = true;

            try {
                const data = await queryFn(abortControllerInstance.current!.signal) as TData;
                // Cancel Request: We provide a fall-back mechanism for cancelling the request, as AbortController was not supported in legacy browsers and we will not enter inside `catch` when the abort happens
                if (!isMounted.current) {
                    return;
                };
                cache[cacheKey] = data;
                setData(data);
                setStatus("success");
                setIsSuccess(true);
            } catch (error) {
                if (!isMounted.current) {
                    return;
                };
                if (error instanceof Error) {
                    if (abortControllerInstance.current!.signal.aborted) {
                        setError({ message: error.message } as TError);
                    } else if (error.message === "Client or Server Error") {
                        setError({ message: "Client or Server Error" } as TError);
                    } else {
                        setError({ message: "Network Error" } as TError);
                    }
                } else {
                    setError({ message: "General Error" } as TError);
                }
                setStatus("error");
                setIsError(true);
            } finally {
                if (!isMounted.current) {
                    return;
                };
                setIsLoading(false);
                isLoadingRef.current = false;
            }
        };
        fetchDataAsync();

        return () => {
            // TODO: hot module reload still calls this and I end up getting stuck on "loading"
            isMounted.current = false;
            if (isLoadingRef.current) {
                abortControllerInstance.current!.abort();
            }
        }
    }, [cacheKey, enabled]);

    return {
        status: status,
        data: data,
        error: error,
        isInitial: isInitial,
        isLoading: isLoading,
        isError: isError,
        isSuccess: isSuccess,
        cancelRequest: cancelRequest
    };
};

export default useQuery;