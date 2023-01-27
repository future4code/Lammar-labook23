import { CustomError } from "../error/CustomError"
import { generateId } from "../services/idGenerator"
import { FriendshipInputDTO } from "../model/friendshipDTO"
import { FriendshipDatabase } from "../data/FriendshipDatabase"
import { friendship } from "../model/friendship"

export class FriendshipBusiness {
  async create(input: FriendshipInputDTO): Promise<void> {
    try {
      const { userId, friendId } = input

      if (!userId || !friendId) {
        throw new CustomError(422, "userId and friendId must be provided.")
      }

      const id = generateId()

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

}
