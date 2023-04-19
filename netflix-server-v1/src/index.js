import express from "express";
import cors from "cors";
import routerInstance from "./routes.js";
import connectDB from "./configs/database.config.js";

const PORT = 5000;

// Configure the server
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: '*',
}));
app.use(express.static("public"));
app.use(express.json());
app.use(routerInstance);

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});
