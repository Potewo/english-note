import type { TNote } from './note'
import type { Record } from './record'

class Api {
  url: string
  constructor(url: string) {
    this.url = url
  }
  get() : Promise<TNote[]> {
    return new Promise((resolve, reject) => {
      fetch(this.url + "/get", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.status == 201) {
          response.json().then(res => {
            const resData = res as TNote[]
            console.log(resData)
            resolve(resData)
          }).catch(e => {
            console.log(e)
            reject(e)
          })
        } else {
          reject(`Status code is different from expected
expected: 201
got: ${response.status}
response: ${response.text()}`)
        }
      })
      .catch(e => {
        reject(e)
      })
    })
  }
  upload(method: "new"|"update"|"delete", note: TNote) : Promise<string> {
    let httpMethod: string
    if (method == "new") {
      httpMethod = "post"
    } else if (method == "update") {
      httpMethod = "put"
    } else if (method == "delete") {
      httpMethod = "delete"
    }
    console.log(httpMethod)
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(note))
      fetch(this.url + "/upload", {
        method: httpMethod,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
      })
      .then(response => {
        if (response.ok) {
          if (response.status == 200) {
            resolve("ok")
          } else {
            let error_message = ""
            let server_message = "Server doesn't return valid message"
            response.json()
            .then(data => {
              server_message = data.message
            })
            .catch(e => {
              error_message = e.stringify()
            })
            reject("\nResponse http code is not 200." + error_message + "\nServer error message:\n" + server_message + "\n")
          }
        } else {
          reject("Response is not ok")
        }
      })
      .catch(e => {
        reject(e)
      })
    })
  }
  getRecords(): Promise<Record[]> {
    return new Promise<Record[]>((resolve, reject) => {
      fetch(this.url + "/record", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        if (response.ok) {
          if (response.status == 200) {
            response.json()
            .then(result => {
              resolve(result)
            })
            .catch(err => {
              reject("not valid json received" + err)
            })
          } else {
            reject("Server returned: " + response.status)
          }
        } else {
          reject("Response is not ok: " + response.status)
        }
      })
      .catch(err => {
        reject("Failed to fetch: " + err)
      })
    })
  }
  addRecord(records: Record[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fetch(this.url + "/record", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(records)
      })
      .then(response => {
        if (response.ok && response.status == 200) {
          resolve("ok")
        } else {
          reject("Server returned error: " + response.status)
        }
      })
      .catch(err => {
        reject("Failed to fetch: " + err)
      })
    })
  }
}

let hostname = location.hostname
export const api = new Api("http://" + hostname + ":1323")
