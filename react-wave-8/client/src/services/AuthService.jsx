import usePost from "../hooks/usePost";

const baseUrl = "http://localhost:3002";

const useRegister = () => {
    // private fields
    const [_makeRequest, _cancelRequest] = usePost();
    const url = `${baseUrl}/auth/register`;

    // public fields
    const makeRequest = async (firstName, lastName, email, password) => {
        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        return _makeRequest(url, payload);
    }

    return [makeRequest, _cancelRequest]
}

const useLogin = () => {
    // private fields
    const [_makeRequest, _cancelRequest] = usePost();
    const url = `${baseUrl}/auth/login`;

    // public fields
    const makeRequest = async (email, password) => {
        const payload = {
            email: email,
            password: password
        }
        return _makeRequest(url, payload);
    }

    return [makeRequest, _cancelRequest]
}

export {
    useRegister,
    useLogin
}
