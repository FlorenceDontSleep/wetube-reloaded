import express from "express"
//export default 가 없다면 export를 모두 명시해줘야한다.
import {
    getEdit,
    postEdit, 
    logout, 
    see, 
    startGitHubLogin,
    finishGitHubLogin,
} from "../controller/userController";

const userRouter = express.Router();;

userRouter.get("/logout", logout);
userRouter.get("/edit", getEdit);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/github/start", startGitHubLogin);
userRouter.get("/github/finish", finishGitHubLogin);
userRouter.get(":id", see);

export default userRouter;