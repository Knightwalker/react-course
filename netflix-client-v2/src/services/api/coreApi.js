import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const coreApi = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: VITE_SERVER_BASE_URL
    }),
    endpoints: () => ({})
});

export default coreApi;