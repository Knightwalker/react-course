import { useEffect, useState } from "react";

type TQueryStatus = "initial" | "loading" | "success" | "error";

type TUseQueryProps<TData> = {
    queryKey: (string | number | boolean)[],
    queryFn: () => Promise<TData>,
    enabled?: boolean
};

type TDefaultError = { message: string };

const useQuery = <
    TData,
    TError extends { message: string } = TDefaultError
>({
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

    useEffect(() => {
        if (!enabled) {
            return;
        };

        const fetchDataAsync = async () => {
            setStatus("loading");
            setIsInitial(false);
            setIsLoading(true);
            setIsSuccess(false);
            setIsError(false);
            try {
                const data = await queryFn() as TData;
                setData(data);
                setStatus("success");
                setIsSuccess(true);
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "Client or Server Error") {
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
                setIsLoading(false);
            }
        };
        fetchDataAsync();
    }, [queryKey]);

    return {
        status: status,
        data: data,
        error: error,
        isInitial: isInitial,
        isLoading: isLoading,
        isError: isError,
        isSuccess: isSuccess
    };
};

export default useQuery;