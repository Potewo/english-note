import type {Note} from './note'
import type {Record} from './record'
import type {WithPagination} from "./types"
import {handleError} from './util'

class Api {
  url: string
  constructor(url: string) {
    this.url = url
  }
  async getNotes(): Promise<WithPagination<Note[]>> {
    const queries = new URLSearchParams(window.location.search)
    const page = queries.get("page")
    const pageSize = queries.get("page_size")
    try {
      const urlWithParams = new URL(this.url + "/note")
      if (page != null) {
        urlWithParams.searchParams.set("page", page)
      }
      if (pageSize != null) {
        urlWithParams.searchParams.set("page_size", pageSize)
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
        return {value: json, page: Number(page), lastPage: lastPage}
      } else {
        throw "http status code is different."
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
