<script lang="ts">
  import { aiTyping, messages } from "$lib/store/chatStore";
  import MessageBubble from "./MessageBubble.svelte";
  import { afterUpdate } from "svelte";

  let messageContainer: HTMLDivElement;

  // Scroll to bottom whenever messages change
  afterUpdate(() => {
    messageContainer?.scrollTo({
      top: messageContainer.scrollHeight,
      behavior: "smooth",
    });
  });
</script>

<div bind:this={messageContainer} class="message-list">
  {#each $messages as msg (msg.id)}
    <MessageBubble role={msg.role} content={msg.content} />
  {/each}

  {#if $aiTyping}
    <div class="typing-indicator">Mira is typing...</div>
  {/if}
</div>

<style>
  .message-list {
    display: flex;
    flex-direction: column;
    height: 80vh;
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    background: #fafafa;
  }
  .typing-indicator {
    font-style: italic;
    color: #777;
    margin: 0.2rem 0;
  }
</style>
