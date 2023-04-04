const authDB = require("../db/authDB.json");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
    app.post("/auth/register", (req, res) => {
        const { email } = req.body.data;

        if (typeof authDB.users[email] !== "undefined") {
            return res.status(409).send({
                ok: false,
                message: "User already exists!"
            });
        }

        authDB.users[email] = req.body.data;
        res.status(200).send({ok: true});
    });

    app.post("/auth/login", (req, res) => {
        const { email } = req.body.data;

        // Validations
        if (typeof authDB.users[email] === "undefined") {
            return res.status(409).send({
                ok: false,
                message: "User does not exists!"
            });
        }

        const user = authDB.users[email];

        // JWT
        const payload = {
            email: email
        }
        const token = jwt.sign(payload, "keyboard cats", { expiresIn: "1h"});

        // Response
        res.status(201).send({
            ok: true,
            token: token
        });
    });
}
