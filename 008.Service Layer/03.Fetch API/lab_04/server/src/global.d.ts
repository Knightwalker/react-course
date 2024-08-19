declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string,
            CLIENT_ORIGIN: string,
            [key: string]: string,
            // more env variables...
        }
    }
};

export {};