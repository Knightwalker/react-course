"use strict";

// Libs
import jwt from "jsonwebtoken";

// Models
import UserModel from "../models/userModel.js";

// Local fields
const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME;
const JWT_SECRET = process.env.JWT_SECRET

const AuthenticationMiddleware = async (req, res, next) => {
    // Step 1. Read the JWT token from the cookie
    const token = req.cookies[JWT_COOKIE_NAME] ?? "";
    
    if (token.length <= 0) {
        res.status(401).send({ message: "Not Authenticated!" }); // no token
        return;
    }

    // Step 2. Verify JWT
    let verifiedToken = null;
    try {
        verifiedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        res.status(401).send({ message: "Not Authenticated!" }); // token failed
        return;
    }

    // Step 3. Add the user in the request pipeline
    req.user = await UserModel.findById(verifiedToken.id).select(["-hash", "-salt"]); // filter sensitive information
    next();
}

export default AuthenticationMiddleware;