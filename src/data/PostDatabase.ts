import { CustomError } from "../error/CustomError";
import { BaseDatabase } from "./BaseDatabase";
import { post, postDB } from "../model/post"

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_posts";

  async create(post: post): Promise<void> {
    try {
      await PostDatabase.connection
        .insert({
          id: post.id,
          photo: post.photo,
          description: post.description,
          type: post.type,
          author_id: post.authorId
        })
        .into(PostDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  async selectById(id: string): Promise<postDB[]> {
    try {
      const result = await PostDatabase.connection(PostDatabase.TABLE_NAME)
        .select("*")
        .where({ id })

      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

  async selectFeed(friendId: string): Promise<postDB[]> {
    try {
      const result = await PostDatabase.connection(PostDatabase.TABLE_NAME)
        .select("*")
        .where({ author_id: friendId })

      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };
}
