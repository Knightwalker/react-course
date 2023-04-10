import crypto from "node:crypto";
import db from "../../db/config.js";

const findUserByEmail = (email) => {
    const results = db.data.users.filter(user => user.email === email);
    if (results.length === 0) {
        return false;
    }
    return true;
}

const getUserByEmail = (email) => {
    const results = db.data.users.filter(user => user.email === email);
    if (results.length === 0) {
        return null;
    }
    return results[0];
}

const registerUser = async (req, res) => {
    // TODO: Model Validations
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    // Step 1. Database Validations
    const isUserFound = findUserByEmail(data.email);
    if (isUserFound) {
        return res.send({ message: "User already exists." });
    };

    // Step 2. Generate a salt and hash
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(data.password, salt, 1000, 64, "sha512").toString("hex");

    // Step 3. Create user and save to db
    const user = {
        name: req.body.name,
        email: req.body.email,
        salt: salt,
        hash: hash
    }

    db.data.users.push(user);
    await db.write();
    res.status(201).send({ message: "User was created." });
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
        return res.status(401).send({ message: "Credentials are wrong." });
    };
    const user = getUserByEmail(data.email);

    // Step 2. Check if the hash matches the stored hash
    // Hash the provided password with the stored salt, retrieved from the database.
    const hash = crypto.pbkdf2Sync(data.password, user.salt, 1000, 64, "sha512").toString("hex");
    if (!hash === user.hash) {
        return res.status(401).send({ message: "Credentials are wrong." });
    }

    return res.status(200).send({message: "You are authenticated."});
}

export {
    registerUser,
    loginUser
}