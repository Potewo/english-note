<script lang="ts">
  import type { TNote } from './note'
  import Quiz from './lib/Quiz.svelte'
  export let notes: TNote[]
  let i = 0
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
</script>

<Quiz note={notes[i]} />

<div class="uk-width-1-2@m uk-margin-auto uk-margin-medium-top">
  <div class="uk-text-center">
    <button class="uk-button uk-button-default uk-margin-auto-left"><span uk-icon="icon: close"></span></button>
    <button class="uk-button uk-button-default uk-margin-small-left uk-margin-right-auto"><span uk-icon="icon: check"></span></button>
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
