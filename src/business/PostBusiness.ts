import { PostDatabase } from "../data/PostDatabase"
import { CustomError } from '../error/CustomError'
import { InvalidDescription, InvalidType } from "../error/PostErrors"
import { post, postDB } from '../model/post'
import { PostInputDTO } from "../model/postDTO"
import { Authenticator } from "../services/Authenticator"
import { generateId } from "../services/idGenerator"

const authenticator = new Authenticator()

export class PostBusiness {
  async create(input: PostInputDTO): Promise<void> {
    try {
      const { photo, description, type, token } = input

      if (!photo || !description || !type) {
        throw new CustomError(422, "photo, description and type must be provided.")
      }

      if (description.length < 5) {
        throw new InvalidDescription()
      }

      if (type !== "event" && type !== "normal") {
        throw new InvalidType()
      }

      const authorId = authenticator.getTokenData(token).id

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

  async getById(id: string): Promise<postDB> {
    try {
      const postDatabase = new PostDatabase();
      const post = await postDatabase.selectById(id)

      return post;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

  async getByType(type: string): Promise<postDB[]> {
    try {
      const postDatabase = new PostDatabase();
      const posts = await postDatabase.selectByType(type)

      if (type !== "event" && type !== "normal") {
        throw new InvalidType()
      }

      if (posts.length === 0) {
        throw new CustomError(404, "There is no posts with this type.")
      }

      const orderedPosts = posts.sort((a, b): any =>
        (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0)
      )

      return orderedPosts;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

}
