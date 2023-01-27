import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { post, postDB } from "../model/post";
import { PostInputDTO } from "../model/postDTO";

export class PostController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { photo, description, type, authorId } = req.body

      const input: PostInputDTO = {
        photo,
        description,
        type,
        authorId
      }

      const postBusiness = new PostBusiness();
      await postBusiness.create(input);

      res.status(201).send({ message: "Post successfully created." });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async getById (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const postBusiness = new PostBusiness()
      const posts: postDB[] = await postBusiness.getById(id)

      res.status(200).send({ posts });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };
}
