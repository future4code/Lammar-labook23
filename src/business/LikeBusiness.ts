import { CustomError } from "../error/CustomError"
import { generateId } from "../services/idGenerator"
import { Authenticator } from "../services/Authenticator"
import { LikeInputDTO } from "../model/likeDTO"
import { LikeDatabase } from "../data/LikeDatabase"
import { like } from "../model/like"

const authenticator = new Authenticator()

export class LikeBusiness {
  async create(input: LikeInputDTO): Promise<void> {
    try {
      const { token, postId } = input

      if (!postId) {
        throw new CustomError(422, "postId must be provided.")
      }

      const id = generateId()

      const userId = authenticator.getTokenData(token).id

      const likeDatabase = new LikeDatabase()

      const getLikes = await likeDatabase.select()

      const findLike = getLikes.find(like => {
        return like.user_id === userId && like.post_id === postId
      })

      if (findLike) {
        throw new CustomError(409, "The post is already liked.")
      }

      const like: like = {
        id,
        userId,
        postId
      }

      await likeDatabase.insert(like)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async delete(input: LikeInputDTO): Promise<void> {
    try {
      const { token, postId } = input

      if (!postId) {
        throw new CustomError(422, "postId must be provided.")
      }

      const userId = authenticator.getTokenData(token).id

      const likeDatabase = new LikeDatabase()

      const getLikes = await likeDatabase.select()

      const findLike = getLikes.find(like => {
        return like.user_id === userId && like.post_id === postId
      })

      if (!findLike) {
        throw new CustomError(422, "The post is not liked yet.")
      }

      const likeId = findLike.id

      await likeDatabase.delete(likeId)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

}
