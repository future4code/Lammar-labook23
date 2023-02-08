import { CustomError } from "../error/CustomError";
import { user } from "../model/user";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_users";

  async insert(user: user): Promise<void> {
    try {
      await UserDatabase.connection
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async findUserByEmail(email: string): Promise<user> {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select().where({ email })

      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

}
