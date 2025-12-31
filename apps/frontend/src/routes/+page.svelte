<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->
<script lang="ts">
  import MessageList from "$lib/components/MessageList.svelte";
  import ChatInput from "$lib/components/ChatInput.svelte";

  import { onMount } from "svelte";
  import { addMessage } from "$lib/store/chatStore";
  import { v4 as uuidv4 } from "uuid";

  onMount(() => {
    addMessage({
      id: uuidv4(),
      role: "assistant",
      content:
        "Hi, I’m Mira 👋\nI’m here to help you with any questions about our store - orders, returns, shipping, or support.\nHow can I assist you today?",
    });
  });
</script>

<main>
  <MessageList />
  <ChatInput />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 1rem;
  }
</style>
