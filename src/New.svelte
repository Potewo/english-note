<script lang="ts">
  import TagView from './lib/TagView.svelte'
  import Note from './lib/Note.svelte'

  export let tags: string[]
</script>

<TagView bind:tags={tags}/>
<Note on:send isEditMode={true}/>
