import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO } from "../model/loginDTO";
import { postDB } from "../model/post";
import { UserInputDTO } from "../model/userDTO";

export class UserController {
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const input: UserInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }

      const userBusiness = new UserBusiness();

      const token = await userBusiness.signup(input);

      res.status(201).send({ message: "User successfully created.", token });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  async login (req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const input: LoginInputDTO = {
        email,
        password
      };

      const userBusiness = new UserBusiness()
      const token = await userBusiness.login(input);

      res.status(200).send({ token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  async getFeed(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization as string

      const userBusiness = new UserBusiness()
      const feed: postDB[] = await userBusiness.getFeed(token)

      res.status(200).send({ feed });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };
}
