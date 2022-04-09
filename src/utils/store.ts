import {writable, get} from 'svelte/store'
import type {Note} from './note'
import {EmptyNote} from './note'
import type {Record} from './record'
import {handleError} from '@utils/util'

import {api} from '@utils/api'
import type { ApiOptions } from "@utils/api"

const useNote = () => {
  const {subscribe, set, update: _update} = writable<Note[]>([])
  const get = async (options: ApiOptions) : Promise<number> => {
    const newNotes = await api.getNotes(options).catch(err => {
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

const useApiOptions = () => {
  const {subscribe, set, update: _update} = writable<ApiOptions>({})
  const update = (partialOptions: ApiOptions) => {
    _update((options: ApiOptions) => {
      return {...options, ...partialOptions}
    })
  }
  return {
    subscribe,
    set,
    update
  }
}

export const notes = useNote()
export const records = useRecord()
export const apiOptions = useApiOptions()

export const findNote = async (id: number) : Promise<Note> => {
  notes
  if (get(notes).some(note => note.ID == id)) {
    return get(notes).find(note => note.ID == id)
  } else {
    try {
      const noteWithPagination = await api.getNotes({ids: [id]})
      return noteWithPagination.value[0]
    } catch (err) {
      handleError(err, "failed to get note from server")
      return new Promise((resolve) => resolve(EmptyNote()))
    }
  }
}

export const apiOptionsToURL = (baseURL: string) => {
  const url = new URL(baseURL);
  const options = get(apiOptions)
  if (options.page != undefined) {
    if (options.page != 1) {
      url.searchParams.set("page", String(options.page))
    }
  }
  if (options.pageSize != undefined) {
    if (options.pageSize != 30) {
      url.searchParams.set("page_size", String(options.pageSize))
    }
  }
  if (options.search != undefined) {
    url.searchParams.set("search", options.search)
  }
  if (options.correctRate != undefined) {
    if (options.correctRate.start != undefined) {
      url.searchParams.set("correct_rate_start", String(options.correctRate.start))
    }
    if (options.correctRate.end != undefined) {
      url.searchParams.set("correct_rate_end", String(options.correctRate.end))
    }
  }
  if (options.order != undefined) {
    url.searchParams.set("order", options.order)
  }
  if (options.tags != undefined) {
    url.searchParams.delete("tags")
    for (const tag of options.tags) {
      url.searchParams.append("tags", tag)
    }
  }
  if (options.lastPlayed != undefined) {
    if (options.lastPlayed.start != undefined) {
      url.searchParams.set("last_played_start", options.lastPlayed.start.toISOString())
    }
    if (options.lastPlayed.end != undefined) {
      url.searchParams.set("last_played_end", options.lastPlayed.end.toISOString())
    }
  }
  return url.toString();
}
