<script lang="ts">
  import { API_BASE_URL } from "$lib/config";
  import { addMessage, aiTyping, sessionId } from "$lib/store/chatStore";
  import { get } from "svelte/store";
  import { v4 as uuidv4 } from "uuid";

  export let visible = true;

  const prompts = [
    "What is your return policy?",
    "How long does delivery take?",
    "What are your support hours?",
    "Do you offer refunds or exchanges?",
  ];

  async function handlePromptClick(prompt: string) {
    addMessage({ id: uuidv4(), role: "user", content: prompt });

    aiTyping.set(true);

    const res = await fetch(`${API_BASE_URL}/chat/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: prompt,
        sessionId: get(sessionId),
      }),
    });

    const data = await res.json();
    aiTyping.set(false);

    sessionId.set(data.sessionId);
    addMessage({
      id: uuidv4(),
      role: "assistant",
      content: data.reply,
    });
  }
</script>

{#if visible}
  <div class="starter-prompts">
    {#each prompts as prompt}
      <button on:click={() => handlePromptClick(prompt)}>
        {prompt}
      </button>
    {/each}
  </div>
{/if}

<style>
  .starter-prompts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.75rem 0;
  }

  button {
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    border: 1px solid #ddd;
    background: #f9f9f9;
    cursor: pointer;
    font-size: 0.85rem;
  }

  button:hover {
    background: #eee;
  }
</style>
