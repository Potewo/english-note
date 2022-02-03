<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import New from './New.svelte'
  import NoteList from './lib/NoteList.svelte'
  import Note from './lib/Note.svelte'
  import QuizView from './QuizView.svelte'
  import Header2 from './Header2.svelte'
  import { notes } from './store'
  import type { Tag } from './note'
  let tags: Tag[] = []
  notes.get()
</script>

<Header2 />
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
