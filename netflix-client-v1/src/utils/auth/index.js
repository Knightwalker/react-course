/**
 * Checks if the given email address is valid.
 * 
 * @param {string} email - The email address to check.
 * @returns {boolean} - Returns `true` if the email address is valid, otherwise `false`.
 */
function isEmailValid(email) {
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Return the result of matching the email against the regex pattern
    return emailRegex.test(email);
}

/**
* Checks if a password is valid.
* A valid password must be between 6 and 60 characters and may not contain a tilde (~).
* @param {string} password - The password to be validated.
* @returns {boolean} - True if the password is valid, false otherwise.
*/
function isPasswordValid(password) {
    const passwordRegex = /^[^~]{6,60}$/;
    return passwordRegex.test(password);
}

export {
    isEmailValid,
    isPasswordValid
}