<script lang="ts">
  import { link, navigate } from "svelte-routing";
  import { notes } from "@utils/store";
  import { handleError } from "@utils/util";
  import type { ApiOptions } from "@utils/api";
  import Filtering from "lib/Filtering.svelte"
  import { apiOptions, apiOptionsToURL } from "@utils/store";
  let lastPage = 1;
  notes.get($apiOptions).then(_lastPage => {
    lastPage = _lastPage
  }).catch(err => {
    lastPage = 1;
    handleError(err, "failed to get lastpage.")
  })
  const beforeMovePrev = async () => {
    if ($apiOptions.page > 1) {
      apiOptions.update({page: $apiOptions.page-1});
    } else {
      return;
    }
    lastPage = await notes.get($apiOptions);
    window.scrollTo({top: 0})
    navigate(apiOptionsToURL(window.location.origin))
  }
  const beforeMoveNext = async () => {
    if ($apiOptions.page < lastPage) {
      apiOptions.update({page: $apiOptions.page+1});
    } else {
      return;
    }
    lastPage = await notes.get($apiOptions);
    window.scrollTo({top: 0})
    navigate(apiOptionsToURL(window.location.origin))
  }
  const beforeMoveStart = async () => {
    apiOptions.update({page: 1});
    await notes.get($apiOptions);
    window.scrollTo({top: 0});
    navigate(apiOptionsToURL(window.location.origin))
  }
  const beforeMoveEnd = async () => {
    apiOptions.update({page: lastPage});
    await notes.get($apiOptions);
    window.scrollTo({top: 0});
    navigate(apiOptionsToURL(window.location.origin))
  }
  const handleSubmit = async (event: CustomEvent<ApiOptions>) => {
    lastPage = await notes.get(event.detail)
  }
</script>

<!-- <TagView bind:tags={$notes} dataList={$notes.map(note => note.Tags.map(tag => tag.Name)).flat()}/> */ -->
<div>
  <Filtering on:submit={handleSubmit}/>
</div>
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

<ul class="uk-pagination uk-flex-center" uk-margin>
  <li><a on:click={beforeMovePrev} class:uk-disabled={$apiOptions.page <= 1}><span uk-pagination-previous></span></a></li>
  <li><a on:click={beforeMoveStart}>1</a></li>
  <li class="uk-disabled"><span>...</span></li>
  <li class="uk-active"><span>{$apiOptions.page}</span></li>
  <li class="uk-disabled"><span>...</span></li>
  <li><a on:click={beforeMoveEnd}>{lastPage}</a></li>
  <li><a on:click={beforeMoveNext} class:uk-disabled={$apiOptions.page >= lastPage}><span uk-pagination-next></span></a></li>
</ul>

<style>
  table > thead > tr > th > span.material-icons-outlined {
    display: inline-flex;
    vertical-align: middle;
  }
</style>
