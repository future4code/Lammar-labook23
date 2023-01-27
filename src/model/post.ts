export enum POST_TYPES {
  NORMAL = "normal",
  EVENT = "event"
}

export type post = {
  id: string,
  photo: string,
  description: string,
  type: POST_TYPES,
  authorId: string
}

export type postDB = {
  id: string,
  photo: string,
  description: string,
  type: POST_TYPES,
  author_id: string,
  created_at: Date
}
