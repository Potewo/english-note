<script lang="ts">
  import type { ApiOptions } from "@utils/api";
  import { createEventDispatcher } from "svelte";
  import TagView from "lib/TagView.svelte";
  import type { Tag } from "@utils/note";
  import { navigate } from "svelte-routing";
  import { apiOptions, apiOptionsToURL } from "@utils/store";

  let options: ApiOptions = $apiOptions;
  let tags: Tag[] = [];
  let inputLastPlayedDateStart: string = undefined;
  let inputLastPlayedDateEnd: string = undefined;
  if ($apiOptions.tags != undefined) {
    for (const tag of $apiOptions.tags) {
      tags.push({
        ID: undefined,
        CreatedAt: undefined,
        UpdatedAt: undefined,
        DeletedAt: undefined,
        NoteID: undefined,
        Name: tag,
      });
    }
  }
  if ($apiOptions.lastPlayed != undefined) {
    if ($apiOptions.lastPlayed.start != undefined) {
      const date = new Date(
        $apiOptions.lastPlayed.start.getTime() -
          $apiOptions.lastPlayed.start.getTimezoneOffset() * 60 * 1000
      );
      console.log(date);
      inputLastPlayedDateStart = `${date.getFullYear()}-${(
        "0" +
        (date.getMonth() + 1)
      ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
      console.log(inputLastPlayedDateStart);
    }
  }

  const dispatch = createEventDispatcher<{ submit: ApiOptions }>();

  const handleSubmit = () => {
    console.log(options);
    apiOptions.set(options);
    setSearchQuery();
    dispatch("submit", $apiOptions);
  };

  const setSearchQuery = () => {
    const url = apiOptionsToURL(window.location.origin);
    console.log($apiOptions);
    console.log(url);
    navigate(url, { replace: false });
  };

  const updateTags = () => {
    options.tags = [];
    if (tags.length > 0) {
      for (const tag of tags) {
        options.tags.push(tag.Name);
      }
    }
  };

  const updateDate = (s: string): Date => {
    let d = new Date(s);
    d = new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    return d;
  };

  const doNothing = () => {
  }
</script>

<ul uk-accordion>
  <li>
    <a class="uk-accordion-title">絞り込み</a>
    <div class="uk-accordion-content">
      <form class="uk-form-horizontal" on:submit|preventDefault={handleSubmit}>
        <TagView bind:tags on:change={updateTags} />
        <label for="page_size">問題数</label>
        <input
          id="page_size"
          type="number"
          class="uk-select uk-form-width-small uk-form-controls"
          on:change|preventDefault={doNothing}
          bind:value={options.pageSize}
        />
        <button
          class="uk-icon uk-inline"
          type="button"
          on:click|preventDefault={() => {
            options.pageSize = undefined;
          }}
        >
          <span class="material-icons-outlined"> clear </span>
        </button>

        <div class="uk-margin">
          <label for="order" class="uk-form-label">順序</label>
          <div class="uk-form-controls">
            <select
              id="order"
              name="order"
              class="uk-select uk-form-width-medium"
              bind:value={options.order}
            >
              <option value="random">ランダム</option>
              <option value="createdAtDescending">作成降順</option>
              <option value="createdAtAscending">作成昇順</option>
              <option value="updatedAtDescending">更新降順</option>
              <option value="updatedAtAscending">更新昇順</option>
              <option value="englishDescending">英語降順</option>
              <option value="englishAscending">英語昇順</option>
            </select>
            <button
              class="uk-icon uk-inline"
              type="button"
              on:click|preventDefault={() => {
                options.order = undefined;
              }}
            >
              <span class="material-icons-outlined"> clear </span>
            </button>
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
              on:change|preventDefault={doNothing}
              bind:value={options.search}
            />
          </div>
          <button
            class="uk-icon uk-inline"
            type="button"
            on:click|preventDefault={() => {
              options.search = undefined;
            }}
          >
            <span class="material-icons-outlined"> clear </span>
          </button>
        </div>

        <div class="uk-margin">
          <span class="uk-text">正答率</span>
          <div class="uk-form-controls">
            <input
              class="uk-input uk-form-width-small"
              type="number"
              on:change|preventDefault={doNothing}
              bind:value={options.correctRate.start}
            />
            <span>〜</span>
            <input
              class="uk-input uk-form-width-small"
              type="number"
              on:change|preventDefault={doNothing}
              bind:value={options.correctRate.end}
            />
            <button
              class="uk-icon uk-inline"
              type="button"
              on:click|preventDefault={() => {
                options.correctRate.start = undefined;
                options.correctRate.end = undefined;
              }}
            >
              <span class="material-icons-outlined"> clear </span>
            </button>
          </div>
        </div>

        <div class="uk-margin">
          <span class="uk-text">最後にプレイした日時</span>

          <div class="uk-margin">
            <div class="uk-form-controls">
              <input
                type="date"
                class="uk-input uk-form-width-medium"
                bind:value={inputLastPlayedDateStart}
                on:change={() => {
                  options.lastPlayed.start = updateDate(
                    inputLastPlayedDateStart
                  );
                  console.log(options.lastPlayed.start);
                }}
              />
              <span>〜</span>
              <input
                type="date"
                class="uk-input uk-form-width-medium"
                bind:value={inputLastPlayedDateEnd}
                on:change={() =>
                  (options.lastPlayed.end = updateDate(inputLastPlayedDateEnd))}
              />
              <button
                class="uk-icon uk-inline"
                type="button"
                on:click|preventDefault={() => {
                  inputLastPlayedDateStart = undefined;
                  inputLastPlayedDateEnd = undefined;
                  options.lastPlayed.start = undefined;
                  options.lastPlayed.end = undefined;
                }}
              >
                <span class="material-icons-outlined"> clear </span>
              </button>
            </div>
          </div>
        </div>

        <button type="submit" class="uk-button uk-button-default">絞り込む</button>
      </form>
    </div>
  </li>
</ul>
