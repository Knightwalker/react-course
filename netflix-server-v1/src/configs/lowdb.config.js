import path from "node:path";
import url from 'node:url'
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// File path (__dirname does not work with ES6 moduels in my node version. I need to upgrade)
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(path.join(__dirname, './db.json'));
const db = new Low(adapter);
await db.read();

export default db;