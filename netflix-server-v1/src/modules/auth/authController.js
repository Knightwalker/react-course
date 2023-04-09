import crypto from "node:crypto";
import db from "../../db/config.js";

const findUser = (email) => {
    const results = db.data.users.filter(user => user.email === email);
    if (results.length === 0) {
        return false;
    }
    return true;
}

const registerUser = async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    // TODO: Data Validation
    const isUserFound = findUser(data.email);
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
    res.status(201).send({ message: "User was created" });
};

const loginUser = (req, res) => {
    const crypto = require('crypto');

    // Generate a random salt (in real life this should be retrieved from the database)
    const salt = '4c531eb7ba11d1b4c7b2c9a74184a12a';

    // The user's password (in real life this should come from the login form)
    const password = 'myPassword123';

    // Hash the provided password with the stored salt
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Check if the hash matches the stored hash
    if (hash === storedHash) {
        // Login successful
    } else {
        // Login failed
    }
}

export {
    registerUser
}