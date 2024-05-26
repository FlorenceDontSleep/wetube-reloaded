import express from "express"
//export default 가 없다면 export를 모두 명시해줘야한다.
import {
    edit, 
    remove, 
    logout, 
    see, 
    startGitHubLogin,
    finishGitHubLogin,
} from "../controller/userController";

const userRouter = express.Router();;

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", startGitHubLogin);
userRouter.get("/github/finish", finishGitHubLogin);
userRouter.get(":id", see);

export default userRouter;