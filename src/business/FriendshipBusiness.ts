import { CustomError } from "../error/CustomError"
import { generateId } from "../services/idGenerator"
import { FriendshipInputDTO } from "../model/friendshipDTO"
import { FriendshipDatabase } from "../data/FriendshipDatabase"
import { friendship } from "../model/friendship"
import { Authenticator } from "../services/Authenticator"

const authenticator = new Authenticator()

export class FriendshipBusiness {
  async create(input: FriendshipInputDTO): Promise<void> {
    try {
      const { token, friendId } = input

      if (!friendId) {
        throw new CustomError(422, "friendId must be provided.")
      }

      const id = generateId()

      const userId = authenticator.getTokenData(token).id

      const friendshipDatabase = new FriendshipDatabase()

      const getFriendships = await friendshipDatabase.select()

      const findFriendship = getFriendships.find(friendship => {
        return (friendship.friend_id === friendId || friendship.friend_id === userId) && (friendship.user_id === friendId || friendship.user_id === userId)
      })

      if (findFriendship) {
        throw new CustomError(409, "The users are already friends.")
      }

      const friendship: friendship = {
        id,
        userId,
        friendId
      }

      await friendshipDatabase.create(friendship)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async delete(input: FriendshipInputDTO): Promise<void> {
    try {
      const { token, friendId } = input

      if (!friendId) {
        throw new CustomError(422, "friendId must be provided.")
      }

      const userId = authenticator.getTokenData(token).id

      const friendshipDatabase = new FriendshipDatabase()

      const getFriendships = await friendshipDatabase.select()

      const findFriendship = getFriendships.find(friendship => {
        return (friendship.friend_id === friendId || friendship.friend_id === userId) && (friendship.user_id === friendId || friendship.user_id === userId)
      })

      if (!findFriendship) {
        throw new CustomError(422, "The users are not friends.")
      }

      const friendshipId = findFriendship.id

      await friendshipDatabase.delete(friendshipId)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

}
