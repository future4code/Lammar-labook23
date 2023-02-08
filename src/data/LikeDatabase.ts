import { CustomError } from "../error/CustomError";
import { like, likeDB } from "../model/like";
import { BaseDatabase } from "./BaseDatabase";

export class LikeDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_likes";

  async insert(like: like): Promise<void> {
    try {
      await LikeDatabase.connection
        .insert({
          id: like.id,
          user_id: like.userId,
          post_id: like.postId
        })
        .into(LikeDatabase.TABLE_NAME)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async select(): Promise<likeDB[]> {
    try {
      const result = await LikeDatabase.connection(LikeDatabase.TABLE_NAME)
        .select()

      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

  async delete(likeId: string): Promise<void> {
    try {
      await LikeDatabase.connection(LikeDatabase.TABLE_NAME)
        .delete()
        .where({ id: likeId })

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

}
