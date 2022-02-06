<script lang="ts">
  import { link } from "svelte-routing";
  /* import type { Note, Tag } from 'scripts/note' */
  /* import TagView from './TagView.svelte' */
  import { notes } from "@utils/store";
</script>

<!-- <TagView bind:tags={$notes} dataList={$notes.map(note => note.Tags.map(tag => tag.Name)).flat()}/> */ -->
<table class="uk-table uk-table-middle uk-table-striped">
  <thead>
    <tr>
      <th class="">英語</th>
      <th class="">
        <span>日本語</span>
        <span class="material-icons-outlined" uk-toggle="target: .japanese">
          visibility
        </span>
      </th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each $notes as note}
      <tr>
        <td>
          <a class="uk-link-reset" href={"/notes/" + note.ID} use:link>
            {note.English}
          </a>
        </td>
        <td>
          <span class="japanese" hidden>{note.Japanese}</span>
        </td>
        <td class="uk-table-shrink uk-text-nowrap">
          <div class="uk-inline uk-hidden@s">
            <button class="uk-icon">
              <span class="material-icons-outlined">more_horiz</span>
            </button>
            <div
              class="uk-width-auto"
              uk-dropdown="mode: click; boundary: .dropdown-boundary"
            >
              <ul class="uk-nav uk-dropdown-nav">
                <li class="uk-active">
                  <a class="uk-icon" href={"/edit/" + note.ID} use:link>
                    <span class="material-icons-outlined">edit</span>Edit
                  </a>
                </li>
                <li class="uk-active">
                  <button
                    class="uk-icon uk-inline"
                    on:click={() => {
                      notes.deletes([note]);
                    }}
                    ><span class="material-icons-outlined">delete</span>
                  </button>
                  Delete
                </li>
                <li class="uk-active">
                  <a class="uk-icon" href={"/notes/" + note.ID} use:link>
                    <span class="material-icons-outlined">navigate_next</span>
                    Detail
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="uk-visible@s">
            <a class="uk-icon" href={"/edit/" + note.ID} use:link>
              <span class="material-icons-outlined">edit</span>
            </a>
            <button
              class="uk-icon"
              on:click={() => {
                notes.deletes([note]);
              }}
              ><span class="material-icons-outlined">delete</span>
            </button>
            <a class="uk-icon" href={"/notes/" + note.ID} use:link>
              <span class="material-icons-outlined">navigate_next</span>
            </a>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table > thead > tr > th > span.material-icons-outlined {
    display: inline-flex;
    vertical-align: middle;
  }
</style>
