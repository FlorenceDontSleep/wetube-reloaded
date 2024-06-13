import express from "express";

//default가 아닌 값을 import 할 때는 정확한 이름을 기재해야함
import { getJoin, postJoin, getLogin, postLogin } from "../controller/userController";
import { home, search } from "../controller/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

//로그인 확인하고 체크해주는 middleware 설정
rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);


//파일을 통째로 import 할 경우 사용
export default rootRouter;