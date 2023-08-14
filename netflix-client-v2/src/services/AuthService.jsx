// Libs
import { createAsyncThunk } from "@reduxjs/toolkit";

// Enums
import { ENUM_SERVICE_ERROR_TYPE } from "./enums";

const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

class ServiceError extends Error {
    constructor(message, type, status = null) {
        super(message);
        this.type = type;
        this.status = status;
    }
}

const postLogin = createAsyncThunk("auth/postLogin", async(payload, { signal }) => {
    let response = null;
    let responseData = null;

    // Step 1. Networking Layer: Make the request. If it fails, handle network errors.
    try {
        response = await fetch(`${VITE_SERVER_BASE_URL}/api/auth/login`, {
            signal: signal,
            method: "POST",
            credentials: "include", // If the server response sets cookies, we need to set this to `include` so that we enable both sending cookies to the server and saving cookies by a browser.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
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
        if (typeof responseData.message !== "undefined") {
            throw new ServiceError(responseData.message, ENUM_SERVICE_ERROR_TYPE.UNSUCCESSFUL_RESPONSE, response.status);
        }
        throw new ServiceError("Your attempt was unsuccessful, please verify your data", ENUM_SERVICE_ERROR_TYPE.UNSUCCESSFUL_RESPONSE, response.status);
    }

    // Step 4. Application Layer: Handle successful response status codes (within the range of 200-299).
    return responseData;
});

const postRegister = createAsyncThunk("auth/postRegister", async(payload, { signal }) => {
    let response = null;
    let responseData = null;

    // Step 1. Networking Layer: Make the request. If it fails, handle network errors.
    try {
        response = await fetch(`${VITE_SERVER_BASE_URL}/api/auth/register`, {
            signal: signal,
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
        if (typeof responseData.message !== "undefined") {
            throw new ServiceError(responseData.message, ENUM_SERVICE_ERROR_TYPE.UNSUCCESSFUL_RESPONSE, response.status);
        }
        throw new ServiceError("Your attempt was unsuccessful, please verify your data", ENUM_SERVICE_ERROR_TYPE.UNSUCCESSFUL_RESPONSE, response.status);
    }

    // Step 4. Application Layer: Handle successful response status codes (within the range of 200-299).
    return responseData;
});

const postLoginErrorHandler = (error) => {
    console.error(error.message);
    // Handle specific error types or status codes
    if (error.type === ENUM_SERVICE_ERROR_TYPE.NETWORK_ERROR) {
        // Handle network errors
    } else if (error.type === ENUM_SERVICE_ERROR_TYPE.PARSE_ERROR) {
        // Handle parse errors
    } else if (error.type === ENUM_SERVICE_ERROR_TYPE.UNSUCCESSFUL_RESPONSE) {
        // Handle unsuccessful response errors
        if (error.status >= 400 && error.status < 500) {
            // Handle client errors
        } else if (error.status >= 500 && error.status < 600) {
            // Handle server errors
        } else {
            // Handle other errors, not in (200-299)
        }
    } else {
        // Handle other unknown errors. (I'm not sure if we can ever hit such a case at this level)
        console.error("We have encountered an unknown error. If this persists, please contact support.");
    }
};

const postRegisterErrorHandler = (error) => {
    console.error(error.message);
    // Handle specific error types or status codes
    if (error.type === ENUM_SERVICE_ERROR_TYPE.NETWORK_ERROR) {
        // Handle network errors
    } else if (error.type === ENUM_SERVICE_ERROR_TYPE.PARSE_ERROR) {
        // Handle parse errors
    } else if (error.type === ENUM_SERVICE_ERROR_TYPE.UNSUCCESSFUL_RESPONSE) {
        // Handle unsuccessful response errors
        if (error.status >= 400 && error.status < 500) {
            // Handle client errors
        } else if (error.status >= 500 && error.status < 600) {
            // Handle server errors
        } else {
            // Handle other errors, not in (200-299)
        }
    } else {
        // Handle other unknown errors. (I'm not sure if we can ever hit such a case at this level)
        console.error("We have encountered an unknown error. If this persists, please contact support.");
    }
};

export {
    postLogin,
    postLoginErrorHandler,
    postRegister,
    postRegisterErrorHandler
};