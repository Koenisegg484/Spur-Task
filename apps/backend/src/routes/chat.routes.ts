import { Router } from "express";
import { chatMessageSchema } from "../utils/validation.js";
import { handleChatMessage } from "../services/chat.service.js";
import { rateLimiter } from "../config/ratelimitter.js";
import type { Request, Response } from "express";

const router = Router();

router.post("/message", rateLimiter, async (req: Request, res: Response) => {
  try {
    const parsed = chatMessageSchema.safeParse(req.body);

    if (!parsed.success) {
      const errorMessage =
        parsed.error.flatten().fieldErrors.message?.[0] ??
        "Invalid request payload";

      return res.status(400).json({ error: errorMessage });
    }

    const { message, sessionId } = parsed.data;

    if (!message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    if (message.length > 2000) {
      return res
        .status(400)
        .json({ error: "Message too long (max 2000 chars)" });
    }

    const result = await handleChatMessage({
      message: parsed.data.message,
      ...(parsed.data.sessionId && { sessionId: parsed.data.sessionId }),
    });

    return res.json(result);
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
});

export default router;
