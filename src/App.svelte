<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import New from 'routes/New.svelte'
  import NoteList from 'lib/NoteList.svelte'
  import Note from 'lib/Note.svelte'
  import QuizView from 'routes/QuizView.svelte'
  import Header from 'lib/Header.svelte'
  import { notes } from './utils/store'
  import type { Tag } from './utils/note'
  let tags: Tag[] = []
  notes.get()
</script>

<Header />
<main>
  <Router>
    <Route path="new">
      <New bind:tags={tags} />
    </Route>
    <Route path="/">
      <NoteList />
    </Route>
    <Route path="notes/:id" let:params>
      <Note note="{$notes.find(obj => obj.ID == Number(params.id))}"/>
    </Route>
    <Route path="edit/:id" let:params>
      <Note note="{$notes.find(obj => obj.ID == Number(params.id))}" mode={"update"} />
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
