import { writable } from "svelte/store";

export type Message = {
  id: string;
  role: "user" | "assistant"; // Who sent it
  content: string; // Text content
};

export const messages = writable<Message[]>([]);

export const sessionId = writable<string | null>(null);

export const aiTyping = writable(false);

export function addMessage(msg: Message) {
  messages.update((m) => [...m, msg]);
}
