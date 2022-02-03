<script lang="ts">
  import type { Note } from '../utils/note'
  import { notes } from '../utils/store'
  export let note: Note = {
    ID: 0,
    CreatedAt: null,
    UpdatedAt: null,
    DeletedAt: null,
    English: "",
    Japanese: "",
    Description: "",
    Examples: "",
    Similar: "",
    Tags: [],
  }
  export let mode: "new"|"view"|"update" = "view"
  const handleSend = () => {
    if (mode == "new") {
      notes.add([note])
    } else if (mode == "update") {
      notes.update([note])
    }
  }
</script>

<p>
<label for="english">英語</label></p>
<p>
{#if mode=="new" || mode=="update"}
  <textarea id="english" bind:value={note.English}></textarea>
{:else}
  <span>{note.English}</span>
{/if}
</p>

<p><label for="japanese">日本語</label></p>
<p>
{#if mode=="new" || mode=="update"}
  <textarea id="japanese" bind:value={note.Japanese}></textarea>
{:else}
  <span>{note.Japanese}</span>
{/if}
</p>

<p><label for="description">説明</label></p>
<p>
{#if mode=="new" || mode=="update"}
  <textarea id="description" bind:value={note.Description}></textarea>
{:else}
  <span>{note.Description}</span>
{/if}
</p>

<p><label for="examples">用例</label></p>
<p>
{#if mode=="new" || mode=="update"}
  <textarea id="examples" bind:value={note.Examples}></textarea>
{:else}
  <span>{note.Examples}</span>
{/if}
</p>

<p><label for="similar">類似</label></p>
<p>
{#if mode=="new" || mode=="update"}
  <textarea id="similar" bind:value={note.Similar}></textarea>
{:else}
  <span>{note.Similar}</span>
{/if}
</p>
{#if mode=="new" || mode=="update"}
  <button on:click={handleSend}>決定</button>
{/if}
