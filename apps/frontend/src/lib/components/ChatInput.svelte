<script lang="ts">
  import { addMessage, aiTyping, sessionId } from "$lib/store/chatStore";

  import { v4 as uuidv4 } from "uuid";

  let input = "";
  let loading = false;

  async function sendMessage() {
    if (!input.trim()) return;

    const id = uuidv4();
    addMessage({ id, role: "user", content: input });

    const currentSession = $sessionId;
    const messageToSend = input;
    input = "";
    loading = true;
    aiTyping.set(true);

    try {
      const res = await fetch("http://localhost:4000/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          sessionId: currentSession,
        }),
      });
      const data = await res.json();

      aiTyping.set(false);
      loading = false;

      sessionId.set(data.sessionId);
      addMessage({ id: uuidv4(), role: "ai", content: data.reply });
    } catch (err) {
      aiTyping.set(false);
      loading = false;
      addMessage({
        id: uuidv4(),
        role: "ai",
        content: "Oops, something went wrong!",
      });
    }
  }
</script>

<div class="chat-input">
  <input
    type="text"
    bind:value={input}
    on:keydown={(e) => e.key === "Enter" && sendMessage()}
    placeholder="Type a message..."
    disabled={loading}
  />
  <button on:click={sendMessage} disabled={loading || !input.trim()}
    >Send</button
  >
</div>

<style>
  .chat-input {
    display: flex;
    margin-top: 0.5rem;
  }
  input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 12px 0 0 12px;
    border: 1px solid #ccc;
    outline: none;
  }
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0 12px 12px 0;
    background-color: #0077cc;
    color: white;
    cursor: pointer;
  }
  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
</style>
