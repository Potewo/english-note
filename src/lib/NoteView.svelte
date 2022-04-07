<script lang="ts">
  import { link } from "svelte-routing";
  import type { Note, Tag } from "@utils/note";
  import { notes } from "@utils/store";
  import TagView from "lib/TagView.svelte";
  export let tags: Tag[] = [];
  export let note: Note = {
    ID: 0,
    CreatedAt: null,
    UpdatedAt: null,
    DeletedAt: null,
    English: "",
    Japanese: "",
    Description: "",
    Examples: "",
    Similar: "",
    Tags: [],
  };
  export let mode: "new" | "view" | "update" = "view";
  export let style: "modal" | "card" = "card";
  if (mode != "new") {
    tags = note.Tags
  }
  const handleSend = () => {
    note.Tags = tags;
    if (mode == "new") {
      notes.add([note]);
    } else if (mode == "update") {
      notes.update([note]);
    }
    note = {
      ID: 0,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      English: "",
      Japanese: "",
      Description: "",
      Examples: "",
      Similar: "",
      Tags: [],
    };
  };
  const cardStyle = "uk-card uk-card-default uk-card-body uk-margin-auto uk-width-1-2@m";
  const modalStyle = "";
</script>

<div class={style == "card" ? cardStyle : modalStyle}>
  <a href={`/edit/${note.ID}`} class="uk-icon uk-align-right" use:link><span class="material-icons-outlined">edit</span></a>
  <TagView bind:tags viewMode={mode == "view"}/>
  <h3 class="uk-title">
    <label for="english">英語</label>
  </h3>
  <p>
    {#if mode == "new" || mode == "update"}
      <textarea id="english" bind:value={note.English} class="uk-textarea" />
    {:else}
      <span>{note.English}</span>
    {/if}
  </p>

  <h3 class="uk-title"><label for="japanese">日本語</label></h3>
  <p>
    {#if mode == "new" || mode == "update"}
      <textarea id="japanese" bind:value={note.Japanese} class="uk-textarea" />
    {:else}
      <span class="text">{note.Japanese}</span>
    {/if}
  </p>

  <h3 class="uk-title"><label for="description">説明</label></h3>
  <p>
    {#if mode == "new" || mode == "update"}
      <textarea
        id="description"
        bind:value={note.Description}
        class="uk-textarea"
      />
    {:else}
      <span class="text">{note.Description}</span>
    {/if}
  </p>

  <h3 class="uk-title"><label for="examples">用例</label></h3>
  <p>
    {#if mode == "new" || mode == "update"}
      <textarea id="examples" bind:value={note.Examples} class="uk-textarea" />
    {:else}
      <span class="text">{note.Examples}</span>
    {/if}
  </p>

  <h3 class="uk-title"><label for="similar">類似</label></h3>
  <p>
    {#if mode == "new" || mode == "update"}
      <textarea id="similar" bind:value={note.Similar} class="uk-textarea" />
    {:else}
      <span class="text">{note.Similar}</span>
    {/if}
  </p>
  {#if mode == "new" || mode == "update"}
    <button on:click={handleSend} class="uk-button uk-button-default"
      >決定</button
    >
  {/if}
</div>

<style>
  .text {
    white-space: pre-wrap;
  }
</style>
