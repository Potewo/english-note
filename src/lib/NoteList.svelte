<script lang="ts">
  import { link } from "svelte-routing";
  import { notes } from "@utils/store";
  import { getPageQuery, handleError } from "@utils/util"
  let [page, pageSize] = getPageQuery();
  let lastPage = 1;
  notes.get({page, pageSize}).then(_lastPage => {
    lastPage = _lastPage
  }).catch(err => {
    lastPage = 1;
    handleError(err, "failed to get lastpage.")
  })
  const beforeMovePrev = async () => {
    if (page > 1) {
      page--;
    } else {
      return;
    }
    lastPage = await notes.get({page, pageSize});
    window.scrollTo({top: 0})
  }
  const beforeMoveNext = async () => {
    if (page < lastPage) {
      page++;
    } else {
      return;
    }
    lastPage = await notes.get({page, pageSize});
    window.scrollTo({top: 0})
  }
  const beforeMoveStart = async () => {
    page = 1;
    await notes.get({page, pageSize});
    window.scrollTo({top: 0});
  }
  const beforeMoveEnd = async () => {
    page = lastPage;
    await notes.get({page, pageSize});
    window.scrollTo({top: 0});
  }
  let randomPageSize = 30;
  const handleRandom = async () => {
    lastPage = await notes.get({mode: "random", pageSize: randomPageSize})
  }
</script>

<!-- <TagView bind:tags={$notes} dataList={$notes.map(note => note.Tags.map(tag => tag.Name)).flat()}/> */ -->
<div>
  <label for="random_n">問題数</label>
  <input id="random_n" type="number" class="uk-select uk-form-width-small" bind:value={randomPageSize}>
  <button class="uk-button uk-button-default" on:click={handleRandom}>ランダム</button>
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
  <li><a href="?page={String(page)}&page_size={pageSize}" on:click={beforeMovePrev} use:link class:uk-disabled={page <= 1}><span uk-pagination-previous></span></a></li>
  <li><a href="?page=1&page_size={pageSize}" on:click={beforeMoveStart} use:link>1</a></li>
  <li class="uk-disabled"><span>...</span></li>
  <li class="uk-active"><span>{page}</span></li>
  <li class="uk-disabled"><span>...</span></li>
  <li><a href="?page={lastPage}&page_size={pageSize}" on:click={beforeMoveEnd} use:link>{lastPage}</a></li>
  <li><a href="?page={page}&page_size={pageSize}" on:click={beforeMoveNext} use:link class:uk-disabled={page >= lastPage}><span uk-pagination-next></span></a></li>
</ul>

<style>
  table > thead > tr > th > span.material-icons-outlined {
    display: inline-flex;
    vertical-align: middle;
  }
</style>
