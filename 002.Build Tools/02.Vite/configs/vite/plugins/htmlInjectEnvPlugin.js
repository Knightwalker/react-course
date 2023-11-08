const htmlInjectEnvPlugin = () => {
    return {
        name: "html-transform",
        apply: "serve", // either "build" or "serve"; default is both
        transformIndexHtml(html) {
            return {
                html,
                tags: [
                    {
                        tag: "script",
                        attrs: {
                            src: "/env.js",
                            crossorigin: "anonymous",
                            injectTo: "head"
                        }
                    }
                ]
            }
        },
    }
}

export default htmlInjectEnvPlugin;