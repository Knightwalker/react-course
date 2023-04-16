"use strict";

import crypto from "node:crypto";
import db from "../../db/config.js";
import UserModel from "./userModel.js";
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
        !UserModel.isValidEmail(data.email) ||
        !UserModel.isValidPassword(data.password) ||
        !UserModel.doPasswordsMatch(data.password, data.confirmPassword)
    ) {
        return res.status(400).json({ message: "We couldn't process your input data." });
    }

    // Step 2. Database Validations
    const isUserFound = findUserByEmail(data.email);
    if (isUserFound) {
        return res.status(409).send({ message: "We couldn't create your account with that information." });
    };

    // Step 2. Generate a salt and hash
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(data.password, salt, 1000, 64, "sha512").toString("hex");

    // Step 3. Create user and save to db
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        salt: salt,
        hash: hash
    });

    db.data.users.push(user);
    await db.write();
    res.status(201).send({ message: "Account has been successfully created!" });
};

const loginUser = (req, res) => {
    // TODO: Model Validations
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    // Step 1. Database Validations
    const isUserFound = findUserByEmail(data.email);
    if (!isUserFound) {
        return res.status(401).send({ message: "We couldn't verify your account with that information." });
    };
    const user = getUserByEmail(data.email);

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