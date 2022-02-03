import { writable } from 'svelte/store'
import type { Note } from './note'
import type { Record } from './record'

import { api } from './api'

const useNote = () => {
  const { subscribe, set, update: _update } = writable<Note[]>([])
  const get = async () => {
    //TODO:エラーハンドリング
    const newNotes = await api.getNotes()
    console.log(newNotes)
    if (newNotes != null) {
      set(newNotes)
    }
  }
  const add = async (newNotes: Note[]) => {
    const _newNotes = await api.addNotes(newNotes)
    _update((notes: Note[]) => {
      if (_newNotes != null) {
        return [...notes, ..._newNotes]
      }
      return [...notes]
  })}
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
    const _deleteNotes = await api.deleteNotes(deleteNotes)
      _update((oldNotes: Note[]) => {
      if (_deleteNotes != null) {
        return oldNotes.filter(_note => {
          for (const note of _deleteNotes) {
            if (note.ID == _note.ID) {
              return false
            }
          }
          return true
        })
      }
      return [...oldNotes]
    })
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
  const { subscribe, set, update: _update } = writable<Record[]>([])
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
