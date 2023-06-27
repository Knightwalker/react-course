"use strict";

// Libs
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

// DTO
import LoginRequestDTO from "./DTOs/loginRequestDTO.js";
import RegisterRequestDTO from "./DTOs/registerRequestDTO.js";

// Models
import UserModel from "./models/userModel.js";

// Services
import {
    findUserByEmail,
    getUserByEmail
} from "./services/userService.js";

const loginUser = async (req, res) => {
    // Step 1. Model Binding & Schema Validations
    const loginRequestDTO = LoginRequestDTO({
        email: req.body.email,
        password: req.body.password
    });

    try {
        await loginRequestDTO.validate();
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
        const isUserFound = await findUserByEmail(loginRequestDTO.email);
        if (!isUserFound) {
            return res.status(401).send({ message: "We couldn't verify your account with that information." });
        };
        user = await getUserByEmail(loginRequestDTO.email);
    } catch (error) {
        return res.status(500).send({ message: "We encountered a server error." });
    }

    // Step 2. Check if the hash matches the stored hash
    // Hash the provided password with the stored salt, retrieved from the database.
    const hash = crypto.pbkdf2Sync(loginRequestDTO.password, user.salt, 1000, 64, "sha512").toString("hex");
    if (!hash === user.hash) {
        return res.status(401).send({ message: "We couldn't verify your account with that information." });
    }

    // Step 3. Create JWT
    const loginResponseDTO = {
        id: user._id
    }

    const token = jwt.sign({ loginResponseDTO: loginResponseDTO }, process.env.SERVER_JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60 // 3 days
    });

    return res.status(200).send({ token: token, message: "You were verified successfully!" });
}

const registerUser = async (req, res) => {
    // Step 1. Model Binding & Schema Validations
    const registerRequestDTO = RegisterRequestDTO({
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    });

    try {
        await registerRequestDTO.validate();
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
        const isUserFound = await findUserByEmail(registerRequestDTO.email);
        if (isUserFound) {
            return res.status(409).send({ message: "We couldn't create your account with that information." });
        };
    } catch (error) {
        return res.status(500).send({ message: "We encountered a server error." });
    }

    // Step 2. Generate a salt and hash
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(registerRequestDTO.password, salt, 1000, 64, "sha512").toString("hex");

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

export {
    loginUser,
    registerUser
}