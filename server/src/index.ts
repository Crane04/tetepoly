import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { registerSocketHandlers } from "./socket";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4200;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

registerSocketHandlers(io);

httpServer.listen(PORT, () => {
  console.log(`Monopoly server running on http://localhost:${PORT}`);
});
