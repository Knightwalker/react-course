"use strict";

// Libs
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

// DTO
import LoginRequestDTO from "./DTOs/loginRequestDTO.js";
import RegisterRequestDTO from "./DTOs/registerRequestDTO.js";

// Services
import {
    findUserByEmail,
    getUserByEmail,
    createUser
} from "./services/userService.js";

// Local fields
const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME;
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Login user
 * @route POST /api/users/register
 * @access Public
 * @returns {void}
 */
const login = async (req, res) => {
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
        console.error(errorMessagesArr);
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

    // Step 3. Check if the hash matches the stored hash
    // Hash the provided password with the stored salt, retrieved from the database.
    const hash = crypto.pbkdf2Sync(loginRequestDTO.password, user.salt, 1000, 64, "sha512").toString("hex");
    if (!hash === user.hash) {
        return res.status(401).send({ message: "We couldn't verify your account with that information." });
    }

    // Step 4. Create JWT
    const loginResponseDTO = {
        id: user._id
    }

    const token = jwt.sign(loginResponseDTO, JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: 1 * 24 * 60 * 60 // 1 day in secodns
    });

    // Step 4. Set JWT as HTTP-Only cookie
    res.cookie(JWT_COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });

    return res.status(200).send({ message: "You were verified successfully!" });
}

/**
 * Register user
 * @route POST /api/users/register
 * @access Public
 * @returns {void}
 */
const register = async (req, res) => {
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
        console.error(errorMessagesArr);
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

    // Step 3. Create user and save to db
    try {
        await createUser(registerRequestDTO.email, registerRequestDTO.password)
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).send({ message: "We encountered a server error." });
    }

    res.status(201).send({ message: "Your account has been successfully created!" });
};

/**
 * Logout user
 * @route POST /api/users/logout
 * @access Private
 * @returns {void}
 */
const logout = (req, res) => {
    res.cookie(JWT_COOKIE_NAME, "", {
        httpOnly: true,
        expires: 0
    });

    res.status(200).json({ message: "You logged out successfully!" });
};

export {
    login,
    register,
    logout
}