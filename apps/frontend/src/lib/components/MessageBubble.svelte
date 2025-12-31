<script lang="ts">
  import { marked } from "marked";

  export let role: "user" | "assistant";
  export let content: string = "";
</script>

<div class="row {role}">
  {#if role === "assistant"}
    <img class="avatar" src="/mira.png" alt="Mira" />
  {/if}

  <div class="bubble {role}">
    {@html content ? marked.parse(content) : ""}
  </div>
</div>

<style>
  .row {
    display: flex;
    align-items: flex-start;
    margin: 0.4rem 0;
    max-width: 100%;
  }

  .row.user {
    justify-content: flex-end;
  }

  .row.assistant {
    justify-content: flex-start;
  }

  .bubble {
    padding: 0.6rem 0.9rem;
    border-radius: 14px;
    max-width: 70%;
    word-wrap: break-word;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .bubble.user {
    background: #ffffff;
    border: 1px solid #e5e5e5;
  }

  .bubble.assistant {
    background: #ede8ff;
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-right: 8px;
  }
</style>
