<script lang="ts">
  import Tag from './Tag.svelte'
  let tags: string[] = []
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
    <Tag name={tagName} i={i} on:delete={deleteTag}/>
  </div>
  {/each}
  <input bind:value={inputtingTag} on:change={addTag}/>
</div>

<style>
  .tagView {
    background-color: #cccccc;
    padding: 10px;
  }
  .tag {
    display: inline-block;
    margin: 5px;
  }
</style>
