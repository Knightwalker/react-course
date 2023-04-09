import express from "express";
import routerInstance from "./routes.js";

const PORT = 5000;

// Configure the server
const app = express();
app.use(express.json());
app.use(routerInstance);

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
});
