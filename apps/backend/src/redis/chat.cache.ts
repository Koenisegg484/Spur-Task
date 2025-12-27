const CHAT_TTL_SECONDS = 60 * 30; // 30 minutes

export type CachedMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const chatCacheKey = (sessionId: string) => `chat:session:${sessionId}`;

export function serialize(messages: CachedMessage[]) {
  return JSON.stringify(messages);
}

export function deserialize(raw: string): CachedMessage[] {
  return JSON.parse(raw);
}

export { CHAT_TTL_SECONDS };