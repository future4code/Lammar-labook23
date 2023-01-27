import { CustomError } from "../error/CustomError";
import { friendship, friendshipDB } from "../model/friendship";
import { BaseDatabase } from "./BaseDatabase";

export class FriendshipDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_friendship";

  async create(friendship: friendship): Promise<void> {
    try {
      await FriendshipDatabase.connection
        .insert({
          id: friendship.id,
          user_id: friendship.userId,
          friend_id: friendship.friendId
        })
        .into(FriendshipDatabase.TABLE_NAME)
        
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async select(): Promise<friendshipDB[]> {
    try {
      const result = await FriendshipDatabase.connection(FriendshipDatabase.TABLE_NAME)
        .select()

      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

}
