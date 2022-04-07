<script lang="ts">
  import type { ApiOptions } from "@utils/api";
  import { createEventDispatcher } from "svelte";
  import TagView from "lib/TagView.svelte";
  import type { Tag } from "@utils/note";
  import { navigate } from "svelte-routing";

  let accordionOpened = false;

  let options: ApiOptions = {
    page: undefined,
    pageSize: undefined,
    search: undefined,
    correctRate: {
      start: undefined,
      end: undefined,
    },
    tags: undefined,
    order: undefined,
    lastPlayed: {
      start: undefined,
      end: undefined,
    },
  }

  let tags: Tag[] = []
  let inputLastPlayedDateStart: string = undefined;
  let inputLastPlayedDateEnd: string = undefined;

  const dispatch  = createEventDispatcher<{ submit: ApiOptions }>();

  const handleSubmit = () => {
    setSearchQuery()
    dispatch('submit', options)
  }

  const setSearchQuery = () => {
    const urlWithParams = new URL(window.location.href)
    options.tags = []
    if (tags.length > 0) {
      for (const tag of tags) {
        options.tags.push(tag.Name);
      }
    }
    if (options.pageSize != undefined) {
      urlWithParams.searchParams.set("page_size", String(options.pageSize))
    }
    if (options.search != undefined) {
      urlWithParams.searchParams.set("search", options.search)
    }
    if (options.correctRate.start != undefined) {
      urlWithParams.searchParams.set("correct_rate_start", String(options.correctRate.start))
    }
    if (options.correctRate.end != undefined) {
      urlWithParams.searchParams.set("correct_rate_end", String(options.correctRate.end))
    }
    if (options.order != undefined) {
      urlWithParams.searchParams.set("order", options.order)
    }
    if (options.tags != undefined) {
      urlWithParams.searchParams.delete("tags")
      for (const tag of options.tags) {
        urlWithParams.searchParams.append("tags", tag)
      }
    }
    if (options.lastPlayed.start != undefined) {
      urlWithParams.searchParams.set("last_played_start", options.lastPlayed.start.toISOString())
    }
    if (options.lastPlayed.end != undefined) {
      urlWithParams.searchParams.set("last_played_end", options.lastPlayed.end.toISOString())
    }
    navigate(urlWithParams.toString(), { replace: false })
  }

  const updateDate = (s: string) : Date => {
    let d = new Date(s)
    d = new Date(d.getTime() + (d.getTimezoneOffset() * 60 * 1000))
    return d
  }
</script>

<ul uk-accordion>
  <li>
    <a class="uk-accordion-title">絞り込み</a>
    <div class="uk-accordion-content">
      <form class="uk-form-horizontal">
        <TagView bind:tags={tags}/>
        <label for="page_size">問題数</label>
        <input
          id="page_size"
          type="number"
          class="uk-select uk-form-width-small uk-form-controls"
          bind:value={options.pageSize}
        />

        <div class="uk-margin">
          <label for="order" class="uk-form-label">順序</label>
          <div class="uk-form-controls">
            <select id="order" name="order" class="uk-select uk-form-width-medium" bind:value={options.order}>
              <option value="random">ランダム</option>
              <option value="createdAtDescending">作成降順</option>
              <option value="createdAtAscending">作成昇順</option>
              <option value="updatedAtDescending">更新降順</option>
              <option value="updatedAtAscending">更新昇順</option>
              <option value="englishDescending">英語降順</option>
              <option value="englishAscending">英語昇順</option>
            </select>
          </div>
        </div>

        <div class="uk-margin">
          <label for="search" class="uk-form-label">検索</label>
          <div class="uk-search uk-search-default">
            <span uk-search-icon /><input
              id="search"
              type="text"
              placeholder="Search..."
              class="uk-search-input"
              bind:value={options.search}
            />
          </div>
        </div>

        <div class="uk-margin">
          <span class="uk-text">正答率</span>
          <div class="uk-form-controls">
            <input class="uk-input uk-form-width-small" type="number" bind:value={options.correctRate.start}/>
            <span>〜</span>
            <input class="uk-input uk-form-width-small" type="number" bind:value={options.correctRate.end}/>
          </div>
        </div>

        <div class="uk-margin">
          <span class="uk-text">最後にプレイした日時</span>

          <div class="uk-margin">
            <div class="uk-form-controls">
              <input type="date" class="uk-input uk-form-width-medium" bind:value={inputLastPlayedDateStart} on:change={() => {options.lastPlayed.start = updateDate(inputLastPlayedDateStart);console.log(options.lastPlayed.start)}}/>
              <span>〜</span>
              <input type="date" class="uk-input uk-form-width-medium" bind:value={inputLastPlayedDateEnd} on:change={() => options.lastPlayed.end = updateDate(inputLastPlayedDateEnd)}/>
            </div>
          </div>
        </div>

        <button class="uk-button uk-button-default" on:click|preventDefault={handleSubmit}>絞り込み</button>
      </form>
    </div>
  </li>
</ul>
