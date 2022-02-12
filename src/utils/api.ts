import type {Note} from './note'
import type {Record} from './record'
import type {WithPagination} from "./types"
import {handleError} from '@utils/util'

export type RandomModeOptions = {
  mode: "random"
  limit: number
}

export type PaginationModeOptions = {
  mode: "pagination"
  page: number
  pageSize: number
}

export type NoteOptions = RandomModeOptions | PaginationModeOptions;

class Api {
  url: string
  constructor(url: string) {
    this.url = url
  }
  async getNotes(options: NoteOptions): Promise<WithPagination<Note[]>> {
    try {
      if (options.mode == "pagination") {
        const urlWithParams = new URL(this.url + "/note")
        if (options.page != null) {
          urlWithParams.searchParams.set("page", String(options.page))
        }
        if (options.pageSize != null) {
          urlWithParams.searchParams.set("page_size", String(options.pageSize))
        }
        const response = await fetch(urlWithParams.toString(), {
          method: "get",
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (response.status == 200) {
          const json = await response.json()
          const lastPage = Number(response.headers.get("Englishnote-Lastpage"))
          console.log("lastPage: ", lastPage)
          return {value: json, page: Number(options.page), lastPage: lastPage}
        } else {
          throw "http status code is different."
        }
      }
      else if (options.mode == "random") {
        const urlWithParams = new URL(this.url + "/note")
        urlWithParams.searchParams.set("mode", "random")
        if (options.limit) {
          urlWithParams.searchParams.set("limit", String(options.limit))
        } else {
          urlWithParams.searchParams.set("limit", "30")
        }
        console.log(urlWithParams.toString())
        const response = await fetch(urlWithParams.toString(), {
          method: "get",
          headers: {
            "Content-Type": "application/json"
          }
        }).catch(err => {
          throw err
        })
        if (response.status == 200) {
          const json = await response.json()
          return {value: json, page: 1, lastPage: 1}
        } else {
          console.error("Failed")
          throw "http status is different."
        }
      }
    } catch (e) {
      handleError(e, "failed to get notes.")
      return {value: [], page: 1, lastPage: 1}
    }
  }
  async addNotes(notes: Note[]): Promise<Note[]> {
    try {
      const response = await fetch(this.url + "/note", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notes)
      })
      if (response.status == 201) {
        const json = await response.json()
        return json
      } else {
        throw "http status code is different."
      }
    } catch (e) {
      handleError(e, "failed to add notes.")
      return []
    }
  }
  async updateNotes(notes: Note[]): Promise<Note[]> {
    try {
      const response = await fetch(this.url + "/note", {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notes)
      })
      if (response.status == 201) {
        const json = await response.json()
        return json
      } else {
        throw "http status code is different."
      }
    } catch (e) {
      handleError(e, "failed to update notes.")
      return null
    }
  }
  async deleteNotes(notes: Note[]): Promise<boolean> {
    try {
      const response = await fetch(this.url + "/note", {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notes)
      })
      if (response.status != 200) {
        throw "http status code is different."
      }
      return true
    } catch (e) {
      handleError(e, "failed to update notes.")
      return false
    }
  }
  async getRecords(): Promise<Record[]> {
    try {
      const response = await fetch(this.url + "/record", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status == 200) {
        const json = await response.json()
        return json
      } else {
        throw "http status code is different."
      }
    } catch (e) {
      handleError(e, "failed to update notes.")
      return null
    }
  }
  async addRecords(records: Record[]): Promise<Record[]> {
    try {
      const response = await fetch(this.url + "/record", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(records)
      })
      if (response.status == 201) {
        const json = await response.json()
        return json
      } else {
        throw "http status code is different."
      }
    } catch (e) {
      handleError(e, "failed to update notes.")
      return null
    }
  }
}

let url = location.protocol + "//" + location.hostname + ":1323";
if (import.meta.env.PROD) {
  url = location.origin
}
export const api = new Api(url)
