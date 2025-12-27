import type { Request, Response, NextFunction } from "express";
import { redis } from "../redis/index.js";

const RATE_LIMIT = 5; // max messages
const WINDOW_SECONDS = 10; // per 10 seconds

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Use sessionId if available, else fallback to IP
    const identifier = req.body.sessionId ?? req.ip;
    const key = `rate:${identifier}`;

    const current = await redis.incr(key); // increment counter
    if (current === 1) {
      await redis.expire(key, WINDOW_SECONDS); // set TTL on first hit
    }

    if (current > RATE_LIMIT) {
      return res.status(429).json({
        error: `Too many requests. Try again in ${WINDOW_SECONDS} seconds.`,
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    next(); // fail-open: don’t block if Redis fails
  }
}
