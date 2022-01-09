<script lang="ts">
  import Tag from './Tag.svelte'
  export let tags: string[] = []
  export let viewMode: boolean = false
  let inputtingTag = ""
  const addTag = () => {
    tags = [...tags, inputtingTag]
    inputtingTag = ""
  }
  const deleteTag = (event: CustomEvent<number>) => {
    tags.splice(event.detail, 1)
    tags = tags
  }
</script>

<div class="tagView">
  {#each tags as tagName, i}
  <div class="tag">
    <Tag name={tagName} i={i} on:delete={deleteTag} viewMode/>
  </div>
  {/each}
  { #if !viewMode }
    <input bind:value={inputtingTag} on:change={addTag}/>
  { /if }
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
