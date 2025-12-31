<script lang="ts">
  import { aiTyping, messages } from "$lib/store/chatStore";
  import MessageBubble from "./MessageBubble.svelte";
  import StarterPrompts from "./StarterPrompts.svelte";
  import { afterUpdate } from "svelte";

  let messageContainer: HTMLDivElement;

  $: showPrompts = !$messages.some((m) => m.role === "user");

  afterUpdate(() => {
    messageContainer?.scrollTo({
      top: messageContainer.scrollHeight,
      behavior: "smooth",
    });
  });
</script>

<div class="chat-wrapper">
  <!-- Header -->
  <div class="chat-header">
    <img src="/mira.png" alt="Mira" />
    <div>
      <div class="title">Mira</div>
      <div class="subtitle">ChromaStore AI Chat Support</div>
    </div>
  </div>

  <!-- Messages -->
  <div bind:this={messageContainer} class="message-list">
    {#each $messages as msg (msg.id)}
      <MessageBubble role={msg.role} content={msg.content} />
    {/each}

    {#if $aiTyping}
      <div class="typing-indicator">
        <img src="/technology.png" alt="typing" />
      </div>
    {/if}

    <StarterPrompts visible={showPrompts} />
  </div>
</div>

<style>
  .chat-wrapper {
    display: flex;
    flex-direction: column;
    height: 80%;
    border-radius: 16px;
    overflow: hidden;
    background: #fafafa;
    border: 1px solid #e5e5e5;
  }

  /* Header */
  .chat-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: #9b87f5;
    color: white;
  }

  .chat-header img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  .title {
    font-weight: 600;
    font-size: 0.95rem;
  }

  .subtitle {
    font-size: 0.75rem;
    opacity: 0.9;
  }

  /* Message list */
  .message-list {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  .message-list::-webkit-scrollbar {
    width: 6px;
  }

  .message-list::-webkit-scrollbar-thumb {
    background: #cfc8ff;
    border-radius: 999px;
  }

  .message-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .typing-indicator {
    display: flex;
    align-items: center;
    margin: 0.25rem 0;
  }

  .typing-indicator img {
    width: 32px;
  }
</style>
