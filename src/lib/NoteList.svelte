<script lang="ts">
  import { link } from 'svelte-routing'
  /* import type { Note, Tag } from 'scripts/note' */
  /* import TagView from './TagView.svelte' */
  import { notes } from '../utils/store'
</script>
<!-- <TagView bind:tags={$notes} dataList={$notes.map(note => note.Tags.map(tag => tag.Name)).flat()}/> */ -->
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
  {#each $notes as note}
    <tr>
      <td>{note.English}</td>
      <td><span class="japanese" hidden>{note.Japanese}</span></td>
      <td><a class="uk-icon" href={"/edit/" + note.ID} use:link><span class="material-icons-outlined">edit</span></a></td>
      <td><button class="uk-icon" on:click={() => {notes.deletes([note])}}><span class="material-icons-outlined">delete</span></button></td>
      <td><a class="uk-icon" href={"/notes/" + note.ID} use:link><span class="material-icons-outlined">navigate_next</span></a></td>
    </tr>
  {/each}
  </tbody>
</table>
