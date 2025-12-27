import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/chat", chatRoutes);

  return app;
}
