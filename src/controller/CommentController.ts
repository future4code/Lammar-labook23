import { Request, Response } from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { CommentInputDTO } from "../model/commentDTO";

export class CommentController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const input: CommentInputDTO = {
        token: req.headers.authorization as string,
        postId: req.body.postId,
        message: req.body.message
      }

      const commentBusiness = new CommentBusiness()

      await commentBusiness.create(input);

      res.status(201).send({ message: "Post successfully commented." });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

}
