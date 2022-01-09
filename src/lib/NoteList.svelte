<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { link } from 'svelte-routing'
  import type { TNote } from '../note'
  export let notes: TNote[]
  let currentNote: TNote
  const dispatcher = createEventDispatcher<{"delete": {note: TNote, method: "delete"}}>()
  const handleDelete = () => {
    dispatcher("delete", {note: currentNote, method: "delete"})
  }
</script>

<table class="uk-table uk-table-middle uk-table-striped">
  <thead>
    <tr>
      <th class="uk-table-expand">英語</th>
      <th class="uk-table-expand">日本語</th>
      <th class="uk-table-shrink"></th>
      <th class="uk-table-shrink"></th>
      <th class="uk-table-shrink"></th>
    </tr>
  </thead>
  <tbody>
  {#each notes as note}
    <tr>
      <td>{note.english}</td>
      <td>{note.japanese}</td>
      <td><a class="uk-icon" href={"/edit/" + note.uuid} use:link><span class="material-icons-outlined">edit</span></a></td>
      <td><button class="uk-icon" on:click={() => {currentNote = note;handleDelete()}}><span class="material-icons-outlined">delete</span></button></td>
      <td><a class="uk-icon" href={"/notes/" + note.uuid} use:link><span class="material-icons-outlined">navigate_next</span></a></td>
    </tr>
  {/each}
  </tbody>
</table>
