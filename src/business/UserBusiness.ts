import { UserDatabase } from "../data/UserDatabase"
import { UserInputDTO } from "../model/userDTO"
import { CustomError } from "../error/CustomError"
import { generateId } from "../services/idGenerator"
import { user } from "../model/user"
import { InvalidEmail, InvalidName, InvalidPassword, UserNotFound } from "../error/UserErrors"
import { postDB } from "../model/post"
import { PostDatabase } from "../data/PostDatabase"
import { FriendshipDatabase } from "../data/FriendshipDatabase"
import { Authenticator } from "../services/Authenticator"
import { LoginInputDTO } from "../model/loginDTO"
import { HashManager } from "../services/HashManager"

const userDatabase = new UserDatabase()
const authenticator = new Authenticator()
const hashManager = new HashManager()

export class UserBusiness {
  async signup(input: UserInputDTO): Promise<string> {
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

      const hashPassword: string = await hashManager.generateHash(password)

      const user: user = {
        id,
        name,
        email,
        password: hashPassword
      }

      await userDatabase.insert(user)

      const token = authenticator.generateToken({ id })

      return token;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async login(input: LoginInputDTO): Promise<string> {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new CustomError(400, "email and password must be provided."
        );
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }


      const user = await userDatabase.findUserByEmail(email);

      if (!user) {
        throw new UserNotFound()
      }

      const compareResult: boolean = await hashManager.compareHash(password, user.password)

      if (!compareResult) {
        throw new InvalidPassword()
      }

      const token = authenticator.generateToken({ id: user.id })

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message)
    }
  };

  async getFeed(token: string, page: number): Promise<postDB[]> {
    try {
      const postDatabase = new PostDatabase()
      const friendshipDatabase = new FriendshipDatabase()

      const getFriendships = await friendshipDatabase.select()

      const { id } = authenticator.getTokenData(token)

      const filterFriendships = getFriendships.filter(friendship => {
        return friendship.friend_id === id || friendship.user_id === id
      })

      let friendsIds: string[] = [];
      filterFriendships?.forEach(friendship => {
        if (friendship.friend_id === id) {
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

      if (isNaN(page) || page < 1) {
        page = 1
      }

      let offset = 5 * (page - 1)

      const paginatedFeed = orderedFeed.slice(offset, offset + 5)

      return paginatedFeed;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };
}
