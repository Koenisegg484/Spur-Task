import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.routes.js";
import type { Request, Response } from "express";

export function createApp() {
  const app = express();

  const ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://spur-task.vercel.app",
    "https://spur-task-q8nc4f7tf-mavihs-projects.vercel.app",
  ];
  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      console.error("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));

  // app.options("*", cors(corsOptions));
  app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      cors(corsOptions)(req, res, () => {
        res.sendStatus(204); // Preflight response
      });
    } else {
      next();
    }
  });

  app.use(express.json());

  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.use("/chat", chatRoutes);

  return app;
}
