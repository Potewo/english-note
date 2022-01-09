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

<div class="uk-margin-auto uk-width-1-2@m">
<ul class="uk-pagination">
  <li class="uk-margin-small-left">
    <button on:click={prev}>
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
