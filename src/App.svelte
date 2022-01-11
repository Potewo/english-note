<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import New from './New.svelte'
  import NoteList from './lib/NoteList.svelte'
  import Note from './lib/Note.svelte'
  import QuizView from './QuizView.svelte'
  import { Note as TNote } from './note'
  import { api } from './api'
  /* import Header from './Header.svelte' */
  import Header2 from './Header2.svelte'
  let notes: TNote[] = []
  let tags: string[] = []
  const handleUpload = (e: CustomEvent<{note: TNote, method: "new"|"update"|"delete"}>) => {
    console.log(e.detail.note, e.detail.method)
    if (e.detail) {
      api.upload(e.detail.method, e.detail.note)
      .then(ok => {
        if (ok != "ok") {
          console.error("Can't send note to server.")
          return
        } else {
          console.log("sended")
        }
      })
      .catch(err => {
        console.error(err)
        return
      })
      let currentNote = new TNote()
      console.log(currentNote)
      currentNote.english = e.detail.note.english
      currentNote.japanese = e.detail.note.japanese
      currentNote.description = e.detail.note.description
      currentNote.examples = e.detail.note.examples
      currentNote.similar = e.detail.note.similar
      currentNote.tags = [...tags]
      currentNote.uuid = e.detail.note.uuid
      if (e.detail.method == "new") {
        notes.push(currentNote)
      } else if (e.detail.method == "update") {
        let targetIndex = notes.findIndex(note => note.uuid == currentNote.uuid)
        notes[targetIndex] = currentNote
      } else if (e.detail.method == "delete") {
        notes = notes.filter(note => note.uuid != currentNote.uuid)
      }
      console.log(notes)
      notes = notes
    }
  }
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
      <New on:send={handleUpload} bind:tags={tags} />
    </Route>
    <Route path="/">
      <NoteList bind:notes={notes} on:delete={handleUpload} />
    </Route>
    <Route path="notes/:id" let:params>
      <Note note="{notes.find(obj => obj.uuid == params.id)}"/>
    </Route>
    <Route path="edit/:id" let:params>
      <Note on:send={handleUpload} note="{notes.find(obj => obj.uuid == params.id)}" mode={"update"} />
    </Route>
    <Route path="/quiz">
      <QuizView notes={notes} />
    </Route>
  </Router>
</main>

<style>
  main {
    margin: 10px;
  }
</style>
