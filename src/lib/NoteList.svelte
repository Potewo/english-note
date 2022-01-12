<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { link } from 'svelte-routing'
  import type { TNote } from '../note'
  import TagView from './TagView.svelte'
  export let notes: TNote[]
  let currentNote: TNote
  const dispatcher = createEventDispatcher<{"delete": {note: TNote, method: "delete"}}>()
  const handleDelete = () => {
    dispatcher("delete", {note: currentNote, method: "delete"})
  }
  let filteringTags: string[] = []
  $: filteredNotes = notes.filter(note => {
    return note.tags.length == 0 || note.tags.some(tag => {return filteringTags.includes(tag) || filteringTags.length == 0})
  })
</script>
<TagView bind:tags={filteringTags} dataList={notes.map(note => note.tags).flat()}/>
<table class="uk-table uk-table-middle uk-table-striped">
  <thead>
    <tr>
      <th class="uk-table-expand">英語</th>
      <th class="uk-table-expand">
        日本語
        <button type="button" class="uk-button uk-button-default uk-button-small uk-margin-small-left" uk-toggle="target: .japanese">Show</button>
      </th>
      <th class="uk-table-shrink"></th>
      <th class="uk-table-shrink"></th>
      <th class="uk-table-shrink"></th>
    </tr>
  </thead>
  <tbody>
  {#each filteredNotes as note}
    <tr>
      <td>{note.english}</td>
      <td><span class="japanese" hidden>{note.japanese}</span></td>
      <td><a class="uk-icon" href={"/edit/" + note.uuid} use:link><span class="material-icons-outlined">edit</span></a></td>
      <td><button class="uk-icon" on:click={() => {currentNote = note;handleDelete()}}><span class="material-icons-outlined">delete</span></button></td>
      <td><a class="uk-icon" href={"/notes/" + note.uuid} use:link><span class="material-icons-outlined">navigate_next</span></a></td>
    </tr>
  {/each}
  </tbody>
</table>
