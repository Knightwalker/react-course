"use strict";

import mongoose from "mongoose";

const RegisterRequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/gm, "Email must be a valid email address"]
    },
    password: {
        type: String,
        required: true,
        match: [/^[^~]{6,60}$/, "Password must be between 6 and 60 characters and may not contain a tilde (~)"]
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                const confirmPasswordIsMatched = this.get("password") === this.get("confirmPassword");
                return confirmPasswordIsMatched;
            },
            message: "Password and confirmPassword must match."
        }
    }
});

const RegisterRequestModel = mongoose.model("RegisterRequestModel", RegisterRequestSchema);

export default RegisterRequestModel;