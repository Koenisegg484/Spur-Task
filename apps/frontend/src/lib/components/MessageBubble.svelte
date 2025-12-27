<script lang="ts">
  import { marked } from "marked";

  export let role: "user" | "ai";
  export let content: string = "";
</script>

<div class="message {role}">
  {@html content ? marked.parse(content) : ""}
</div>

<style>
  .message {
    padding: 0.6rem 1rem;
    border-radius: 12px;
    margin: 0.2rem 0;
    max-width: 70%;
    word-wrap: break-word;
  }
  .user {
    background-color: #e0f7fa; /* light blue */
    align-self: flex-end; /* right side */
  }
  .ai {
    background-color: #f1f1f1; /* light gray */
    align-self: flex-start; /* left side */
  }
</style>
