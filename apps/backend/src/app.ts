import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import type { Request, Response } from "express";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.use("/chat", chatRoutes);

  return app;
}
