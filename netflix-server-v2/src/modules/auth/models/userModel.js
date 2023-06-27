"use strict";

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

// fire a function before record is saved to db
UserSchema.pre("save", function (next) {
    console.log("user about to be created & saved", this);
    next();
});

// fire a function after record is saved to db
UserSchema.post("save", function (doc, next) {
    console.log("user about to be created & saved", doc);
    next();
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;