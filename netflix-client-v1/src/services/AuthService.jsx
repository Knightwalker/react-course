import { useMutate } from "./api";

const BASE_URL = "http://localhost:5000";

const usePostRegister = () => {
    const [_makeRequest, _cancelRequest] = useMutate();

    const makeRequest = (payload) => {
        const URL = `${BASE_URL}/api/auth/register`;
        return _makeRequest(URL, "POST", payload);
    }

    return [makeRequest, _cancelRequest];
}

const usePostLogin = () => {
    const [_makeRequest, _cancelRequest] = useMutate();

    const makeRequest = (payload) => {
        const URL = `${BASE_URL}/api/auth/login`;
        return _makeRequest(URL, "POST", payload);
    }

    return [makeRequest, _cancelRequest];
}

export {
    usePostRegister,
    usePostLogin
}
