import express from 'express'
import { LikeController } from '../controller/LikeController'

export const likeRouter = express.Router()

const likeController = new LikeController()

likeRouter.post("/create", likeController.create)

likeRouter.delete("/delete/:postId", likeController.delete)


