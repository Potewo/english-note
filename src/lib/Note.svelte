<script lang="ts">
  import { v4 as uuidv4 } from 'uuid'
  import { createEventDispatcher } from 'svelte'
  import { Note } from '../note'
  export let note = new Note()
  export let isEditMode = false
  const dispatcher = createEventDispatcher<{"send": Note}>()
  const handleSend = () => {
    note.uuid = uuidv4()
    dispatcher('send', note)
    note = new Note()
  }
</script>

<p>
<label for="english">英語</label></p>
<p>
{#if isEditMode}
  <textarea id="english" bind:value={note.english}></textarea>
{:else}
  <span>{note.english}</span>
{/if}
</p>

<p><label for="japanese">日本語</label></p>
<p>
{#if isEditMode}
  <textarea id="japanese" bind:value={note.japanese}></textarea>
{:else}
  <span>{note.japanese}</span>
{/if}
</p>

<p><label for="description">説明</label></p>
<p>
{#if isEditMode}
  <textarea id="description" bind:value={note.description}></textarea>
{:else}
  <span>{note.description}</span>
{/if}
</p>

<p><label for="examples">用例</label></p>
<p>
{#if isEditMode}
  <textarea id="examples" bind:value={note.examples}></textarea>
{:else}
  <span>{note.examples}</span>
{/if}
</p>

<p><label for="similar">類似</label></p>
<p>
{#if isEditMode}
  <textarea id="similar" bind:value={note.similar}></textarea>
{:else}
  <span>{note.similar}</span>
{/if}
</p>
{#if isEditMode}
  <button on:click={handleSend}>決定</button>
{/if}
