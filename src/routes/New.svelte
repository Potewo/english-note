<script lang="ts">
  import type { Tag } from "@utils/note";
  import NoteView from "lib/NoteView.svelte";

  export let tags: Tag[] = [];
</script>

<NoteView mode={"new"} bind:tags />
