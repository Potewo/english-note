<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import New from './New.svelte'
  import NoteList from './lib/NoteList.svelte'
  import Note from './lib/Note.svelte'
  import { Note as TNote } from './note'
  import { Api } from './api'
  /* import Header from './Header.svelte' */
  import Header2 from './Header2.svelte'
  let notes: TNote[] = []
  let tags: string[] = []
  const handleSend = (e: CustomEvent<TNote>) => {
    if (e.detail) {
      api.add(e.detail)
      .then(ok => {
        if (ok != "ok") {
          console.error("Can't send note to server.")
          return
        }
      })
      .catch(err => {
        console.error(err)
        return
      })
    }
    let currentNote = new TNote()
    console.log(currentNote)
    currentNote.english = e.detail.english
    currentNote.japanese = e.detail.japanese
    currentNote.description = e.detail.description
    currentNote.examples = e.detail.examples
    currentNote.similar = e.detail.similar
    currentNote.tags = [...tags]
    currentNote.uuid = e.detail.uuid
    notes.push(currentNote)
    console.log(notes)
    notes = notes
  }
  const api = new Api("http://localhost:1323")
  api.get().then(data => {
    console.log("Success")
    notes = data
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
</script>

<Header2 />
<main>
  <Router>
    <Route path="new">
      <New on:send={handleSend} bind:tags={tags} />
    </Route>
    <Route path="/" component="{NoteList}" bind:notes="{notes}" />
    <Route path="notes/:id" let:params>
      <Note note="{notes.find(obj => obj.uuid == params.id)}"/>
    </Route>
    <Route path="edit/:id" let:params>
      <Note note="{notes.find(obj => obj.uuid == params.id)}" isEditMode={true} />
    </Route>
  </Router>
</main>

<style>
  main {
    margin: 10px;
  }
</style>
