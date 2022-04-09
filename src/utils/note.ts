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

export const EmptyNote = () : Note => {
  return {
    ID: 0,
    CreatedAt: "",
    UpdatedAt: "",
    DeletedAt: "",
    English: "",
    Japanese: "",
    Description: "",
    Examples: "",
    Similar: "",
    Tags: []
  }
}

export type Tag = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
  NoteID: number
  Name: string
}
