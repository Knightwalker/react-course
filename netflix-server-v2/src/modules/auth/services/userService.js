"use strict";

// Libs
import crypto from "node:crypto";

// Models
import UserModel from "../models/userModel.js";

const findUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        if (user === null) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error finding user by email:", error.message);
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        return user;
    } catch (error) {
        console.error("Error finding user by email:", error.message);
        throw error;
    }
};

const createUser = async (email, password) => {
    // Step 1. Generate a salt and hash
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    // Step 2. Create user and save to db
    await UserModel.create({
        email: email,
        salt: salt,
        hash: hash
    });
}

export {
    findUserByEmail,
    getUserByEmail,
    createUser
}