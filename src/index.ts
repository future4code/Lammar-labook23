import { app } from "./app"
import { commentRouter } from "./routes/commentRouter"
import { friendshipRouter } from "./routes/friendshipRouter"
import { likeRouter } from "./routes/likeRouter"
import { postRouter } from "./routes/postRouter"
import { userRouter } from "./routes/userRouter"

app.use("/user", userRouter)

app.use("/post", postRouter)

app.use("/friendship", friendshipRouter)

app.use("/like", likeRouter)

app.use("/comment", commentRouter)