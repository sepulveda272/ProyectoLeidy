import Server from "./model/Server.js";
import dotenv from "dotenv";

dotenv.config();

const server = new Server;

server.listener();