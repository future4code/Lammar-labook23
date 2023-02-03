import { Request, Response } from "express";
import { LikeBusiness } from "../business/LikeBusiness";
import { LikeInputDTO } from "../model/likeDTO";

export class LikeController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const input: LikeInputDTO = {
        token: req.headers.authorization as string,
        postId: req.body.postId
      }

      const likeBusiness = new LikeBusiness();

      await likeBusiness.create(input);

      res.status(201).send({ message: "Post successfully liked." });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const input: LikeInputDTO = {
        token: req.headers.authorization as string,
        postId: req.params.postId
      }

      const likeBusiness = new LikeBusiness();

      await likeBusiness.delete(input);

      res.status(201).send({ message: "Post successfully disliked." });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }
}
