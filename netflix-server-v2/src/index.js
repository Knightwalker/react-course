"use strict";

import "./configs/env.config.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routerInstance from "./routes.js";
import connectDB from "./configs/mongoose.config.js";

const PORT = process.env.PORT;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

// Configure the server
const app = express();
app.use(cors({
    origin: [CLIENT_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(routerInstance);

const startServer = async () => {
    try {
        await connectDB(); // Connect to MongoDB
        app.listen(PORT, () => {
            console.log(`App listening on http://localhost:${PORT}`)
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
}
startServer();

