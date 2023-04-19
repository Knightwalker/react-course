import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    }
});

// Email must be a valid email address
const isValidEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Password must be between 6 and 60 characters and may not contain a tilde (~)
const isValidPassword = (password) => {
    const passwordRegex = /^[^~]{6,60}$/;
    return passwordRegex.test(password);
}

// Password and confirmPassword must match.
const doPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
}

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
export {
    isValidEmail,
    isValidPassword,
    doPasswordsMatch
}