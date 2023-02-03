import { CustomError } from "../error/CustomError";
import { comment } from "../model/comment";
import { BaseDatabase } from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_comments";

  async insert(comment: comment): Promise<void> {
    try {
      await CommentDatabase.connection
        .insert({
          id: comment.id,
          user_id: comment.userId,
          post_id: comment.postId,
          message: comment.message
        })
        .into(CommentDatabase.TABLE_NAME)

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

}
