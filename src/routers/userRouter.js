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
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middlewares";

const userRouter = express.Router();

//로그인이 필요한 페이지에 들어갈때 middleware 실행
userRouter.get("/logout", protectorMiddleware, logout);
userRouter
    .route("/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    // multer로 파일의 정보를 받아 postEdit으로 전달해줌
    // single : 단일 파일 업로드용
    .post(uploadFiles.single("avatar"), postEdit);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGitHubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGitHubLogin);
userRouter.get(":id", see);

export default userRouter;