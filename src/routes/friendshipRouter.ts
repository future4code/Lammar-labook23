import express from 'express'
import { FriendshipController } from '../controller/FriendshipController'

export const friendshipRouter = express.Router()

const friendshipController = new FriendshipController()

friendshipRouter.post("/create", friendshipController.create)

friendshipRouter.delete("/delete/:friendId", friendshipController.delete)


