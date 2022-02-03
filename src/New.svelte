<script lang="ts">
  import type { Tag } from './note'
  import TagView from './lib/TagView.svelte'
  import Note from './lib/Note.svelte'

  export let tags: Tag[]
</script>

<TagView bind:tags={tags}/>
<Note mode={"new"}/>
