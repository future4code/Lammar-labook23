import { CustomError } from "../error/CustomError"
import { generateId } from "../services/idGenerator"
import { Authenticator } from "../services/Authenticator"
import { CommentInputDTO } from "../model/commentDTO"
import { comment } from "../model/comment"
import { CommentDatabase } from "../data/CommentDatabase"

const authenticator = new Authenticator()

export class CommentBusiness {
  async create(input: CommentInputDTO): Promise<void> {
    try {
      const { token, postId, message } = input

      if (!postId || !message) {
        throw new CustomError(422, "postId and message must be provided.")
      }

      const id = generateId()

      const userId = authenticator.getTokenData(token).id

      const commentDatabase = new CommentDatabase()

      const comment: comment = {
        id,
        userId,
        postId,
        message
      }

      await commentDatabase.insert(comment)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

}
