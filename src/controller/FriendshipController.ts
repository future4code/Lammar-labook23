import { Request, Response } from "express";
import { FriendshipBusiness } from "../business/FriendshipBusiness";
import { FriendshipInputDTO } from "../model/friendshipDTO";

export class FriendshipController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const input: FriendshipInputDTO = {
        token: req.headers.authorization as string,
        friendId: req.body.friendId
      }

      const friendshipBusiness = new FriendshipBusiness();

      await friendshipBusiness.create(input);

      res.status(201).send({ message: "Friendship successfully created." });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const input: FriendshipInputDTO = {
        token: req.headers.authorization as string,
        friendId: req.params.friendId
      }

      const friendshipBusiness = new FriendshipBusiness();

      await friendshipBusiness.delete(input);

      res.status(201).send({ message: "Friendship successfully deleted." });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }
}
