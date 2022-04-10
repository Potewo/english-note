<script lang="ts">
  import type { Note } from "@utils/note";
  import TagView from "lib/TagView.svelte";
  export let note: Note;
  console.log(note);
  let hiddens: {[name: string]: boolean} = {
    japanese: true,
    description: true,
    examples: true,
    similar: true
  }
  const toggleAllHiddens = () => {
    for (let key of Object.keys(hiddens)) {
      hiddens[key] = !hiddens[key]
    }
  }
  const toggleHidden = (key: string) => {
    hiddens[key] = !hiddens[key]
  }
</script>

<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-margin-auto">
  <TagView tags={note.Tags} viewMode />
  <h2>{note.English}</h2>
  <p>
    <button
      type="button"
      class="uk-button uk-button-default"
      on:click={() => toggleHidden("japanese")}>日本語</button
    >
  </p>
  <p id="detail-japanese" class="text" hidden={hiddens["japanese"]}>{note.Japanese}</p>
  <p>
    <button
      type="button"
      class="uk-button uk-button-default"
      on:click={() => toggleHidden("description")}>説明</button
    >
  </p>
  <p id="detail-description" class="text" hidden={hiddens["description"]}>{note.Description}</p>
  <p>
    <button
      type="button"
      class="uk-button uk-button-default"
      on:click={() => toggleHidden("examples")}>用例</button
    >
  </p>
  <p id="detail-examples" class="text" hidden={hiddens["examples"]}>{note.Examples}</p>
  <p>
    <button
      type="button"
      class="uk-button uk-button-default"
      on:click={() => toggleHidden("examples")}>類似</button
    >
  </p>
  <p id="detail-similar" class="text" hidden={hiddens["similar"]}>{note.Similar}</p>
  <p>
    <button
      type="button"
      class="uk-button uk-button-default"
      on:click={() => toggleAllHiddens()}>すべて</button
    >
  </p>
</div>

<style>
  .text {
    white-space: pre-wrap;
  }
</style>
