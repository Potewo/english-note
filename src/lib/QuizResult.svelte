<script lang="ts">
  import type { Record } from '@utils/record'
  import type { Note } from '@utils/note'
  export let records: Record[]
  export let notes: Note[]
</script>

<div>
  {#each records as record}
    <p>
      {#if record.Correct }
        <span uk-icon="check"></span>
      {:else}
        <span uk-icon="close"></span>
      {/if}
      <span>{notes.find(note => note.ID == record.ID).English}</span>
    </p>
  {/each}
</div>
