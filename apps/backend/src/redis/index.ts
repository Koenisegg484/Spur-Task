import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}

export const redis = createClient({
  url: redisUrl,
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("error", (err: Error) => {
  console.error("❌ Redis error", err);
});

await redis.connect();
