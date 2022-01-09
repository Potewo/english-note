<script lang="ts">
  import { link } from "svelte-routing"
</script>

<nav class="uk-navbar-container uk-margin site-primary-bg" uk-navbar>
  <div class="uk-navbar-left">
    <a href="/" class="uk-navbar-item uk-logo" use:link><span>English Note</span></a>
  </div>
  <div class="uk-navbar-right">
    <a href="/quiz" class="uk-navbar-item uk-logo" use:link>
      <span class="material-icons-outlined">quiz</span>
    </a>
    <a href="/new" class="uk-navbar-item uk-logo" use:link>
      <span class="material-icons">add</span>
    </a>
  </div>
</nav>

