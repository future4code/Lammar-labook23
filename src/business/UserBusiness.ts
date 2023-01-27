import { UserDatabase } from "../data/UserDatabase"
import { UserInputDTO } from "../model/userDTO"
import { CustomError } from "../error/CustomError"
import { generateId } from "../services/idGenerator"
import { user } from "../model/user"
import { InvalidEmail, InvalidName, InvalidPassword } from "../error/UserErrors"

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

}
