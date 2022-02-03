export type Note = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  English: string
  Japanese: string
  Description: string
  Examples: string
  Similar: string
  Tags: Tag[]
}

export type Tag = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  NoteID: number
  Name: string
}
