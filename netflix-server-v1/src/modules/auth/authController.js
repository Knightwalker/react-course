"use strict";

// Libs
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

// Models
import RegisterRequestModel from "./models/registerRequestModel.js";
import LoginRequestModel from "./models/loginRequestModel.js";
import UserModel from "./models/userModel.js";

// Services
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
    try {
        const registerRequest = new RegisterRequestModel(data);
        await registerRequest.validate();
    } catch (error) {
        const errorMessagesArr = []
        for (const key in error.errors) {
            const message = error.errors[key].message;
            errorMessagesArr.push(message);
        }
        console.error(errorMessagesArr); // TODO: log this to logfile
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
    try {
        await UserModel.create({
            email: req.body.email,
            salt: salt,
            hash: hash
        });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).send({ message: "We encountered a server error." });
    }

    res.status(201).send({ message: "Account has been successfully created!" });
};

const loginUser = async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    // Step 1. Model Validations
    try {
        const registerRequest = new LoginRequestModel(data);
        await registerRequest.validate();
    } catch (error) {
        const errorMessagesArr = []
        for (const key in error.errors) {
            const message = error.errors[key].message;
            errorMessagesArr.push(message);
        }
        console.error(errorMessagesArr); // TODO: log this to logfile
        return res.status(400).json({ message: "We couldn't process your input data." });
    }

    // Step 2. Database Validations
    let user = null;
    try {
        const isUserFound = await findUserByEmail(data.email);
        if (!isUserFound) {
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

    // Step 3. Create JWT
    const loginResponseModel = {
        email: user.email
    }

    const maxAge = 3 * 24 * 60 * 60 // 3 days
    const token = jwt.sign({ loginResponseModel: loginResponseModel }, "Keyboard Cats", {
        expiresIn: maxAge
    });

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
    return res.status(200).send({ token: token, message: "You were verified successfully!" });
}

export {
    registerUser,
    loginUser
}