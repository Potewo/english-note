<script lang="ts">
  import { getContext } from 'svelte';
  import type { Record } from '@utils/record'
  import type { Note } from '@utils/note'
  import NoteView from 'lib/NoteView.svelte';
  const { open } = getContext('simple-modal');
  const showNoteModal = (note: Note) => {
    open(NoteView, { note: note, style: "modal" })
  }
  export let records: Record[]
  export let notes: Note[]
  const matchNote = (recordID: number) => {
    return notes.find(note => note.ID == recordID)
  }
</script>

<div>
  {#each records as record}
    <p>
      {#if record.Correct }
        <span uk-icon="check"></span>
      {:else}
        <span uk-icon="close"></span>
      {/if}
      <button class="uk-button uk-button-link" on:click={() => showNoteModal(matchNote(record.NoteID)) } >
        <span>{matchNote(record.NoteID).English}</span>
      </button>
    </p>
  {/each}
</div>
