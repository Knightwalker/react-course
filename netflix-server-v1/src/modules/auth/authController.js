"use strict";

// Libs
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

// DTO
import LoginRequestDTO from "./DTOs/loginRequestDTO.js"; // TODO: refactor to class
import RegisterRequestDTO from "./DTOs/registerRequestDTO.js"; // TODO: refactor to class

// Models
import UserModel from "./models/userModel.js"; // TODO: refactor to class

// Data
import db from "../../configs/lowdb.config.js";

// Services
import {
    findUserByEmail,
    getUserByEmail
} from "./services/userService.js";

const loginUser = async (req, res) => {
    // Step 1. Model Binding & Schema Validations
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    if (data.email.length <= 0) {
        return res.status(400).json({ message: "We couldn't process your input data." });
    }

    if (data.password.length <= 0) {
        return res.status(400).json({ message: "We couldn't process your input data." });
    }

    // Step 2. Database Validations
    let user = null;
    try {
        const isUserFound = await findUserByEmail(data.email);
        if (!isUserFound) {
            return res.status(401).send({ message: "We couldn't verify your account with that information." });
        };
        user = getUserByEmail(data.email);
        if (user === null) {
            throw new Error();
        }
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
    const payload = {
        id: user._id
    }

    const token = jwt.sign({ payload: payload }, process.env.SERVER_JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60 // 3 days
    });

    return res.status(200).send({ token: token, message: "You were verified successfully!" });
}

const registerUser = async (req, res) => {
    // Step 1. Model Binding & Schema Validations
    const data = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    if (data.email.length <= 0) {
        return res.status(400).json({ message: "We couldn't process your input data." });
    }

    if (data.password.length <= 0) {
        return res.status(400).json({ message: "We couldn't process your input data." });
    }

    // Step 2. Database Validations
    try {
        const isUserFound = findUserByEmail(data.email);
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
    const user = {
        email: req.body.email,
        salt: salt,
        hash: hash
    }

    db.data.users.push(user);
    await db.write();

    res.status(201).send({ message: "Account has been successfully created!" });
};

export {
    loginUser,
    registerUser
}