"use strict";

import crypto from "node:crypto";
import UserModel, {
    isValidEmail,
    isValidPassword,
    doPasswordsMatch
} from "./userModel.js";
import {
    findUserByEmail,
    getUserByEmail
} from "./userService.js";

const registerUser = async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    // Step 1. Model Validations
    if (
        !isValidEmail(data.email) ||
        !isValidPassword(data.password) ||
        !doPasswordsMatch(data.password, data.confirmPassword)
    ) {
        return res.status(400).json({ message: "We couldn't process your input data." });
    }

    // Step 2. Database Validations
    try {
        const isUserFound = await findUserByEmail(data.email);
        if (isUserFound) {
            return res.status(409).send({ message: "We couldn't create your account with that information." });
        };
    } catch (error) {
        return res.status(500).send({ message: "We encountered a server error." });
    }

    // Step 2. Generate a salt and hash
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(data.password, salt, 1000, 64, "sha512").toString("hex");

    // Step 3. Create user and save to db
    const user = new UserModel({
        email: req.body.email,
        salt: salt,
        hash: hash
    });

    try {
        await user.save();
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).send({ message: "We encountered a server error." });
    }

    res.status(201).send({ message: "Account has been successfully created!" });
};

const loginUser = async (req, res) => {
    // TODO: Model Validations
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    // Step 1. Database Validations
    let user = null;
    try {
        const isUserFound = await findUserByEmail(data.email);
        if (isUserFound) {
            return res.status(401).send({ message: "We couldn't verify your account with that information." });
        };
        user = await getUserByEmail(data.email);
    } catch (error) {
        return res.status(500).send({ message: "We encountered a server error." });
    }

    // Step 2. Check if the hash matches the stored hash
    // Hash the provided password with the stored salt, retrieved from the database.
    const hash = crypto.pbkdf2Sync(data.password, user.salt, 1000, 64, "sha512").toString("hex");
    if (!hash === user.hash) {
        return res.status(401).send({ message: "We couldn't verify your account with that information." });
    }

    return res.status(200).send({ message: "You were verified successfully!" });
}

export {
    registerUser,
    loginUser
}