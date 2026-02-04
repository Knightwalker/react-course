import { createServer } from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";
import express from "express";

const { SERVER_PORT } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);

app.use("/", express.static(join(__dirname, "..", "public")));

const io = new Server(httpServer);

httpServer.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}`);
});