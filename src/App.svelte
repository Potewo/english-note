<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import New from "routes/New.svelte";
  import NoteList from "lib/NoteList.svelte";
  import NoteView from "lib/NoteView.svelte";
  import QuizView from "routes/QuizView.svelte";
  import Header from "lib/Header.svelte";
  import { notes } from "@utils/store";
  let tagNames: string[] = [];
  notes.get();
</script>

<Header />
<main>
  <Router>
    <Route path="new">
      <New bind:tagNames />
    </Route>
    <Route path="/">
      <NoteList />
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
