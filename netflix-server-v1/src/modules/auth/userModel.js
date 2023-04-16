"use strict";

class UserModel {
    constructor({ name, email, salt, hash }) {
        this.name = name;
        this.email = email;
        this.salt = salt;
        this.hash = hash;
    }

    // Email must be a valid email address
    static isValidEmail(email) {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Password must be between 6 and 60 characters and may not contain a tilde (~)
    static isValidPassword(password) {
        const passwordRegex = /^[^~]{6,60}$/;
        return passwordRegex.test(password);
    }

    // Password and confirmPassword must match.
    static doPasswordsMatch(password, confirmPassword) {
        return password === confirmPassword;
    }
}

export default UserModel;