import { UserDatabase } from "../data/UserDatabase"
import { UserInputDTO } from "../model/userDTO"
import { CustomError } from "../error/CustomError"
import { generateId } from "../services/idGenerator"
import { user } from "../model/user"
import { InvalidEmail, InvalidName, InvalidPassword } from "../error/UserErrors"
import { post, postDB } from "../model/post"
import { PostDatabase } from "../data/PostDatabase"
import { FriendshipDatabase } from "../data/FriendshipDatabase"

export class UserBusiness {
  async create(input: UserInputDTO): Promise<void> {
    try {
      const { name, email, password } = input

      if (!email || !name || !password) {
        throw new CustomError(422, "name, email and password must be provided.")
      }

      if (!email.includes("@")) {
        throw new InvalidEmail()
      }

      if (name.length < 3) {
        throw new InvalidName()
      }

      if (password.length < 6) {
        throw new InvalidPassword()
      }

      const id = generateId()

      const userDatabase = new UserDatabase()

      const user: user = {
        id,
        name,
        email,
        password
      }

      await userDatabase.create(user)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async getFeed(userId: string): Promise<postDB[]> {
    try {
      const postDatabase = new PostDatabase();
      const friendshipDatabase = new FriendshipDatabase()

      const getFriendships = await friendshipDatabase.select()

      const filterFriendships = getFriendships.filter(friendship => {
        return friendship.friend_id === userId || friendship.user_id === userId
      })

      let friendsIds: string[] = [];
      filterFriendships?.forEach(friendship => {
        if (friendship.friend_id === userId) {
          friendsIds.push(friendship.user_id)
        } else {
          friendsIds.push(friendship.friend_id)
        }
      })

      if (friendsIds.length === 0) {
        throw new CustomError(404, "The user has no friends.")
      }

      let feed: postDB[] = [];
      for (let friendId of friendsIds) {
        const posts = await postDatabase.selectFeed(friendId)
        posts.forEach(post => {
          feed.push(post)
        })
      }

      const orderedFeed = feed.sort((a, b): any =>
        (a.created_at < b.created_at) ? 1 : ((b.created_at < a.created_at) ? -1 : 0)
      )

      return orderedFeed;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };
}
