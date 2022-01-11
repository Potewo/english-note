<script lang="ts">
  import { api } from './api'
  import type { Record } from './record'
  import type { TNote } from './note'
  import Quiz from './lib/Quiz.svelte'
  import QuizResult from './QuizResult.svelte'
  export let notes: TNote[]
  let records: Record[] = []
  let i = 0
  let showResult = false
  const prev = () => {
    if (i <= 0) {
      return
    }
    i--
  }
  const next = () => {
    if (i >= notes.length - 1) {
      return
    }
    i++
  }
  const handleAnswer = (answer: boolean) => {
    let record: Record = {
      uuid: notes[i].uuid,
      date: new Date(),
      correct: answer
    }
    records.push(record)
    if (i >= notes.length - 1) {
      api.addRecord(records)
      .then(ok => {
        if (ok != "ok") {
          console.error("something wrong happened")
        }
      })
      .catch(err => {
        console.error(err)
      })
      showResult = true
    } else {
      i++
    }
  }
</script>

{#if showResult}
  <QuizResult notes={notes} records={records} />
{:else}

  <Quiz note={notes[i]} />

  <div class="uk-width-1-2@m uk-margin-auto uk-margin-medium-top">
    <div class="uk-text-center">
      <button class="uk-button uk-button-default uk-margin-auto-left" on:click={() => {handleAnswer(false)}}>
        <span uk-icon="icon: close"></span>
      </button>
      <button class="uk-button uk-button-default uk-margin-small-left uk-margin-right-auto" on:click={() => {handleAnswer(true)}}>
        <span uk-icon="icon: check"></span>
      </button>
    </div>
  </div>

  <div class="uk-margin-auto uk-width-1-2@m uk-margin-small-top">
  <ul class="uk-pagination">
    <li class="uk-margin-small-left">
      <button on:click={prev} class="uk-button uk-button-link">
        <span class="uk-margin-small-right" uk-pagination-previous></span>
      </button>
    </li>
    <li class="uk-margin-auto-left uk-margin-small-right">
      <button on:click={next} class="uk-button uk-button-link">
        <span class="uk-margin-small-left" uk-pagination-next></span>
      </button>
    </li>
  </ul>
  </div>
{/if}
