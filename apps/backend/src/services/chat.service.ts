import { randomUUID } from "crypto";
import { prisma } from "../db/index.js";
import { redis } from "../redis/index.js";
import {
  chatCacheKey,
  CHAT_TTL_SECONDS,
  type CachedMessage,
  serialize,
  deserialize,
} from "../redis/chat.cache.js";
import { SUPPORT_SYSTEM_PROMPT } from "../config/support_prompt.js";
import { generateReply } from "./llm.services.js";

export async function handleChatMessage(input: {
  message: string;
  sessionId?: string;
}) {
  const sessionId = input.sessionId ?? randomUUID();
  const cacheKey = chatCacheKey(sessionId);

  await prisma.conversation.upsert({
    where: { id: sessionId },
    update: {},
    create: { id: sessionId },
  });

  let messages: CachedMessage[];

  const cached = await redis.get(cacheKey);

  if (cached) {
    messages = deserialize(cached);
  } else {
    /** Cache miss → load from DB */
    const history = await prisma.message.findMany({
      where: { conversationId: sessionId },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    messages = [
      { role: "system", content: SUPPORT_SYSTEM_PROMPT } as const,
      ...history.map(
        (m) =>
          ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          } as const)
      ),
    ];
  }

  messages.push({
    role: "user",
    content: input.message,
  } as const);

  await prisma.message.create({
    data: {
      conversationId: sessionId,
      sender: "user",
      text: input.message,
    },
  });

  const aiReply = await generateReply(messages);

  messages.push({
    role: "assistant",
    content: aiReply,
  } as const);

  await prisma.message.create({
    data: {
      conversationId: sessionId,
      sender: "ai",
      text: aiReply,
    },
  });

  await redis.set(cacheKey, serialize(messages), {
    EX: CHAT_TTL_SECONDS,
  });

  return {
    reply: aiReply,
    sessionId,
  };
}

export async function getConversationHistory(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
}
