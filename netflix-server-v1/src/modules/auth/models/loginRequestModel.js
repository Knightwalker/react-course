"use strict";

import mongoose from "mongoose";

const LoginRequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/gm, "Email must be a valid email address"]
    },
    password: {
        type: String,
        required: true,
        match: [/^[^~]{6,60}$/, "Password must be between 6 and 60 characters and may not contain a tilde (~)"]
    }
});

const LoginRequestModel = mongoose.model("LoginRequestModel", LoginRequestSchema);

export default LoginRequestModel;