"use strict";

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

export {
    findUserByEmail,
    getUserByEmail
}