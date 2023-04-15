import { useMutate } from "./api";
import { ENUM_SERVICE_ERROR_TYPE } from "./enums";

class ServiceError extends Error {
    constructor(message, type, status = null) {
        super(message);
        this.type = type;
        this.status = status;
    }
} 

const BASE_URL = "http://localhost:5000";

const postRegister = async (payload) => {
    let response = null;
    let responseData = null;

    // Step 1. Networking Layer: Make the request. If it fails, handle network errors.
    try {
        response = await fetch(`${BASE_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Network Error:", error.message);
        throw new ServiceError("We have encountered a network error. Please check your internet connection.", ENUM_SERVICE_ERROR_TYPE.NETWORK_ERROR);
    }

    // Step 2. Application Layer: Parse the request. If it fails, handle parsing errors.
    try {
        responseData = await response.json();
    } catch (error) {
        console.error("Parse Error:", error.message);
        throw new ServiceError("We were unable to parse your response data. If this persists, please contact support.", ENUM_SERVICE_ERROR_TYPE.PARSE_ERROR);
    }

    // Step 3. Application Layer: Handle unsuccessful response status codes (not in the range of 200-299).
    if (!response.ok) {
        console.error("Unsuccessful Response:", response.status);
        throw new ServiceError("We couldn't create your account with that information.", ENUM_SERVICE_ERROR_TYPE.UNSUCCESSFUL_RESPONSE, response.status);
    }

    // Step 4. Application Layer: Handle successful response status codes (within the range of 200-299).
    return responseData;
}

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
    usePostLogin,
    postRegister
}
