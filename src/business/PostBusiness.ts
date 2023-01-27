import { PostDatabase } from "../data/PostDatabase"
import { CustomError } from '../error/CustomError'
import { InvalidDescription, InvalidType } from "../error/PostErrors"
import { post, postDB } from '../model/post'
import { PostInputDTO } from "../model/postDTO"
import { generateId } from "../services/idGenerator"

export class PostBusiness {
  async create(input: PostInputDTO): Promise<void> {
    try {
      const { photo, description, type, authorId } = input

      if (!photo || !description || !type || !authorId) {
        throw new CustomError(422, "photo, description, type and authorId must be provided.")
      }

      if (description.length < 5) {
        throw new InvalidDescription()
      }

      if (type != "event" && type != "normal") {
        throw new InvalidType()
      }

      const id = generateId()

      const postDatabase = new PostDatabase()

      const post: post = {
        id,
        photo,
        description,
        type,
        authorId
      }

      await postDatabase.create(post)      
      
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async getById (id: string): Promise<postDB[]> {
    try {
      const postDatabase = new PostDatabase();
      const posts = await postDatabase.selectById(id)

      return posts;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }

  };

}
