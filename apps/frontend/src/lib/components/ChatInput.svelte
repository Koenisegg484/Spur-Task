<script lang="ts">
  import { API_BASE_URL } from "$lib/config";
  import { addMessage, aiTyping, sessionId } from "$lib/store/chatStore";
  import { get } from "svelte/store";
  import { v4 as uuidv4 } from "uuid";

  let input = "";
  let loading = false;

  async function sendMessage() {
    if (!input.trim()) return;

    addMessage({ id: uuidv4(), role: "user", content: input });

    const messageToSend = input;
    const currentSession = get(sessionId);

    input = "";
    loading = true;
    aiTyping.set(true);

    try {
      const res = await fetch(`${API_BASE_URL}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          sessionId: currentSession,
        }),
      });

      const data = await res.json();

      sessionId.set(data.sessionId);
      addMessage({ id: uuidv4(), role: "assistant", content: data.reply });
    } catch {
      addMessage({
        id: uuidv4(),
        role: "assistant",
        content: "Oops, something went wrong!",
      });
    } finally {
      aiTyping.set(false);
      loading = false;
    }
  }
</script>

<div class="chat-input">
  <input
    type="text"
    bind:value={input}
    on:keydown={(e) => e.key === "Enter" && sendMessage()}
    placeholder="Type your message…"
    disabled={loading}
  />

  <button on:click={sendMessage} disabled={loading || !input.trim()}>
    ➤
  </button>
</div>

<style>
  .chat-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border-top: 1px solid #eee;
    background: #fff;
  }

  input {
    flex: 1;
    padding: 0.7rem 1rem;
    border-radius: 999px;
    border: 1px solid #ddd;
    outline: none;
    font-size: 0.95rem;
  }

  input:focus {
    border-color: #9b87f5;
  }

  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: #9b87f5;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
</style>
