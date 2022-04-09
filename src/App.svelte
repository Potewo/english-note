<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import New from "routes/New.svelte";
  import Top from "routes/Top.svelte";
  import NoteView from "lib/NoteView.svelte";
  import QuizView from "routes/QuizView.svelte";
  import Header from "lib/Header.svelte";
  import { notes, findNote } from "@utils/store";
  import { getPageQuery } from "@utils/util";
  import { apiOptions } from "@utils/store";
  import type { Tag } from "@utils/note";
  let tags: Tag[] = [];
  getPageQuery();
  notes.get($apiOptions);
</script>

<Header />
<main>
  <Router>
    <Route path="new">
      <New bind:tags />
    </Route>
    <Route path="/">
      <Top />
    </Route>
    <Route path="notes/:id" let:params>
      {#await findNote(Number(params.id)) then note}
      <NoteView
        note={note}
      />
      {/await}
    </Route>
    <Route path="edit/:id" let:params>
      {#await findNote(Number(params.id)) then note}
      <NoteView
        note={note}
        mode={"update"}
      />
      {/await}
    </Route>
    <Route path="/quiz">
      <QuizView notes={$notes} />
    </Route>
  </Router>
</main>

<style>
  main {
    margin: 10px;
  }
</style>
