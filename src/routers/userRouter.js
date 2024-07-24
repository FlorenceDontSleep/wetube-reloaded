import express from "express"
//export default 가 없다면 export를 모두 명시해줘야한다.
import {
    getEdit,
    postEdit, 
    logout, 
    see, 
    startGitHubLogin,
    finishGitHubLogin,
    getChangePassword,
    postChangePassword,
} from "../controller/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

//로그인이 필요한 페이지에 들어갈때 middleware 실행
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
    .route("/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGitHubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGitHubLogin);
userRouter.get(":id", see);

export default userRouter;