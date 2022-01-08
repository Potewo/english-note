import { NIL as NIL_UUID } from 'uuid'

export type TNote = {
  english: string
  japanese: string
  description: string
  examples: string
  similar: string
  tags: string[]
  uuid: string
}

export class Note implements TNote {
  english: string = ""
  japanese: string = ""
  description: string = ""
  examples: string = ""
  similar: string = ""
  tags: string[] = []
  uuid: string = NIL_UUID
}

