<script lang="ts">
  import type { Tag } from "@utils/note";
  import NoteView from "lib/NoteView.svelte";

  export let tagNames: string[];
  let tags: Tag[] = [];
  tagNames.forEach(tagName => {
    tags.push({
      "ID": null,
      "Name": tagName,
      "NoteID": null,
      "CreatedAt": null,
      "UpdatedAt": null,
      "DeletedAt": null
    })
  })
  $: tagNames = tags.map(tag => tag.Name);
</script>

<NoteView mode={"new"} bind:tags />
