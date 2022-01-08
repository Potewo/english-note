import type { TNote } from './note'

export class Api {
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
  async add(note: TNote) : Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(note))
      fetch(this.url + "/add", {
        method: "post",
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
}
