import coreApi from "./api/coreApi";

const authService = coreApi.injectEndpoints({
    endpoints: (build) => {
        return {
            postLogin: build.mutation({
                query: (payload) => {
                    return {
                        url: "/api/auth/login",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    };
                }
            }),
            postRegister: build.mutation({
                query: (payload) => {
                    return {
                        url: `/api/auth/register`,
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    };
                }
            })
        };
    }
});

const {
    usePostLoginMutation,
    usePostRegisterMutation
} = authService;

export {
    usePostLoginMutation,
    usePostRegisterMutation
};