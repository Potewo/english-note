import {writable} from 'svelte/store'
import type {Note} from './note'
import type {Record} from './record'
import {handleError} from '@utils/util'

import {api} from './api'

const useNote = () => {
  const {subscribe, set, update: _update} = writable<Note[]>([])
  const get = async (page: number, pageSize: number) : Promise<number> => {
    const newNotes = await api.getNotes(page, pageSize).catch(err => {
      handleError(err, "failed to get notes");
      return {value: Array<Note>(), page: 1, lastPage: 1}
    })
    if (newNotes != null && newNotes.value != []) {
      set(newNotes.value)
    }
    return newNotes.lastPage
  }
  const add = async (newNotes: Note[]) => {
    const _newNotes = await api.addNotes(newNotes)
    _update((notes: Note[]) => {
      if (_newNotes != null) {
        return [...notes, ..._newNotes]
      }
      return [...notes]
    })
  }
  const update = async (newNotes: Note[]) => {
    const _newNotes = await api.updateNotes(newNotes)
    _update((oldNotes: Note[]) => {
      if (_newNotes != null) {
        return oldNotes.map(_note => {
          for (const note of _newNotes) {
            if (_note.ID == note.ID) {
              return note
            }
          }
          return _note
        })
      }
      return [...oldNotes]
    })
  }
  const deletes = async (deleteNotes: Note[]) => {
    const success = await api.deleteNotes(deleteNotes)
    if (success) {
      _update((oldNotes: Note[]) => {
        let updatedNotes = oldNotes.filter(_note => {
          for (const note of deleteNotes) {
            if (note.ID == _note.ID) {
              return false
            }
          }
          return true
        })
        console.log(updatedNotes);
        return updatedNotes;
      })
    } else {
      handleError(null, "failed to delete notes.")
    }
  }

  return {
    subscribe,
    get,
    add,
    update,
    deletes
  }
}

const useRecord = () => {
  const {subscribe, set, update: _update} = writable<Record[]>([])
  const get = async () => {
    const newRecords = await api.getRecords()
    if (newRecords != null) {
      set(newRecords)
    }
  }
  const add = async (newRecords: Record[]) => {
    const _newRecords = await api.addRecords(newRecords)
    if (_newRecords != null) {
      _update((records: Record[]) => {
        return [...records, ...newRecords]
      })
    }
  }
  return {
    subscribe,
    get,
    add
  }
}

export const notes = useNote()
export const records = useRecord()
