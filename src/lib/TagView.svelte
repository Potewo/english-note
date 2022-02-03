<script lang="ts">
  import type { Tag } from '../utils/note'
  import TagComponent from 'lib/Tag.svelte'
  export let tags: Tag[] = []
  export let viewMode: boolean = false
  export let dataList: string[] = []
  let inputtingTag = ""
  const deleteTag = (event: CustomEvent<number>) => {
    tags.splice(event.detail, 1)
    tags = tags
  }
  const handleSubmit = () => {
    tags.push({
      ID: null,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      Name: inputtingTag,
      NoteID: null
    })
    tags = tags
    inputtingTag = ""
  }
</script>

<div class="tagView">
  { #if !viewMode }
    <form class="uk-search uk-search-default" on:submit|preventDefault={handleSubmit}>
      <span uk-search-icon></span>
      <input class="uk-search-input" type="search" placeholder="Tag" list="tags" bind:value={inputtingTag}>
      <datalist id="tags">
        {#each Array.from(new Set(dataList)) as tag}
          <option value={tag}>
        {/each}
      </datalist>
    </form>
  { /if }
  {#each tags as tag, i}
  <div class="tag">
    <TagComponent name={tag.Name} i={i} on:delete={deleteTag} viewMode={viewMode}/>
  </div>
  {/each}
</div>

<style>
  .tagView {
    padding: 10px 0px;
  }
  .tag {
    display: inline-block;
    margin-right: 5px;
  }
</style>
