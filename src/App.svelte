<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import New from "routes/New.svelte";
  import Top from "routes/Top.svelte";
  import NoteView from "lib/NoteView.svelte";
  import QuizView from "routes/QuizView.svelte";
  import Header from "lib/Header.svelte";
  import { notes } from "@utils/store";
  import { getPageQuery } from "@utils/util";
  let tagNames: string[] = [];
  let [page, pageSize] = getPageQuery();
  notes.get({mode: "pagination", page: page, pageSize: pageSize});
</script>

<Header />
<main>
  <Router>
    <Route path="new">
      <New bind:tagNames />
    </Route>
    <Route path="/">
      <Top />
    </Route>
    <Route path="notes/:id" let:params>
      <NoteView
        note={$notes.find((obj) => obj.ID == Number(params.id))}
      />
    </Route>
    <Route path="edit/:id" let:params>
      <NoteView
        note={$notes.find((obj) => obj.ID == Number(params.id))}
        mode={"update"}
      />
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
