<script lang="ts">
  import type { ApiOptions } from "@utils/api";
  import { createEventDispatcher } from "svelte";

  let options: ApiOptions = {
    page: undefined,
    pageSize: undefined,
    search: undefined,
    tags: undefined,
    order: undefined,
  }

  const dispatch  = createEventDispatcher<{ submit: ApiOptions }>();

  const handleSubmit = () => {
    dispatch('submit', options)
  }
</script>

<form class="uk-form-horizontal">
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
        <option value="lastPlayedAtDescending">最終プレイ降順</option>
        <option value="lastPlayedAtAscending">最終プレイ昇順</option>
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

  <button class="uk-button uk-button-default" on:click|preventDefault={handleSubmit}>絞り込み</button>
</form>
