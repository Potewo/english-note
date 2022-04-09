<script lang="ts">
  import { derived } from "svelte/store";
  import { link } from "svelte-routing"
  import { apiOptions, apiOptionsToURL } from "@utils/store";
  const quizLink = derived(apiOptions, $apiOptions => {
    const url = new URL(apiOptionsToURL(window.location.origin, $apiOptions))
    url.pathname = "quiz"
    return url.toString()
  })
</script>

<nav class="uk-navbar-container uk-margin site-primary-bg" uk-navbar>
  <div class="uk-navbar-left">
    <a href="/" class="uk-navbar-item uk-logo" use:link><span>English Note</span></a>
  </div>
  <div class="uk-navbar-right">
    <a href={$quizLink} class="uk-navbar-item uk-logo" use:link>
      <span class="material-icons-outlined">quiz</span>
    </a>
    <a href="/new" class="uk-navbar-item uk-logo" use:link>
      <span class="material-icons">add</span>
    </a>
  </div>
</nav>

