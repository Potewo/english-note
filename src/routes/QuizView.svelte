<script lang="ts">
  import { records } from "@utils/store";
  import type { Record } from "@utils/record";
  import type { Note } from "@utils/note";
  import Quiz from "lib/Quiz.svelte";
  import QuizResult from "lib/QuizResult.svelte";
  export let notes: Note[];
  let currentRecords: Record[] = [];
  let i = 0;
  let showResult = false;
  const prev = () => {
    if (i <= 0) {
      return;
    }
    i--;
  };
  const next = () => {
    if (i >= notes.length - 1) {
      return;
    }
    i++;
  };
  const handleAnswer = async (answer: number) => {
    let record: Record = {
      ID: null,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      NoteID: notes[i].ID,
      Correct: answer,
    };
    currentRecords.push(record);
    if (i >= notes.length - 1) {
      await records.add(currentRecords);
      showResult = true;
    } else {
      i++;
    }
  };
  console.log(notes);
</script>

{#if showResult}
  <QuizResult {notes} records={currentRecords} />
{:else}
  {#key notes[i]}
    <Quiz note={notes[i]} />
  {/key}

  <div class="uk-width-1-2@m uk-margin-auto uk-margin-medium-top uk-text-center">
    <div class="uk-button-group uk-margin-auto">
      <button
        class="uk-button uk-button-default"
        on:click={() => {
          handleAnswer(1);
        }}
      >
        <span>1</span>
      </button>
      <button
        class="uk-button uk-button-default"
        on:click={() => {
          handleAnswer(2);
        }}
      >
        <span>2</span>
      </button>
      <button
        class="uk-button uk-button-default"
        on:click={() => {
          handleAnswer(3);
        }}
      >
        <span>3</span>
      </button>
      <button
        class="uk-button uk-button-default"
        on:click={() => {
          handleAnswer(4);
        }}
      >
        <span>4</span>
      </button>
      <button
        class="uk-button uk-button-default"
        on:click={() => {
          handleAnswer(5);
        }}
      >
        <span>5</span>
      </button>
    </div>
  </div>

  <div class="uk-margin-auto uk-width-1-2@m uk-margin-small-top">
    <ul class="uk-pagination">
      <li class="uk-margin-small-left">
        <button on:click={prev} class="uk-button uk-button-link">
          <span class="uk-margin-small-right" uk-pagination-previous />
        </button>
      </li>
      <li class="uk-margin-auto-left uk-disabled">
        <span>
          {i+1}/{notes.length}
        </span>
      </li>
      <li class="uk-margin-auto-left uk-margin-small-right">
        <button on:click={next} class="uk-button uk-button-link">
          <span class="uk-margin-small-left" uk-pagination-next />
        </button>
      </li>
    </ul>
  </div>
{/if}
