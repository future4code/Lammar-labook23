import { POST_TYPES } from "./post";

export interface PostInputDTO {
    photo: string,
    description: string,
    type: POST_TYPES,
    authorId: string
}