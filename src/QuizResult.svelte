<script lang="ts">
  import type { Record } from './record'
  import type { TNote } from './note'
  export let records: Record[]
  export let notes: TNote[]
</script>

<div>
  {#each records as record}
    <p>
      {#if record.correct }
        <span uk-icon="check"></span>
      {:else}
        <span uk-icon="close"></span>
      {/if}
      <span>{notes.find(note => note.uuid == record.uuid).english}</span>
    </p>
  {/each}
</div>
