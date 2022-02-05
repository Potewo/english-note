<script lang="ts">
  import type { Tag } from "@utils/note";
  import Note from "lib/NoteView.svelte";

  export let tags: Tag[];
</script>

<Note mode={"new"} bind:tags />
