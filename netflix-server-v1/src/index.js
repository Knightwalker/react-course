import express from "express";
import cors from "cors";
import routerInstance from "./routes.js";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

// Configure the server
const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.static("public"));
app.use(express.json());
app.use(routerInstance);

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});
