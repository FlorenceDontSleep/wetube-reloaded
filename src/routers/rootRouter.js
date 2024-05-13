import express from "express";

//default가 아닌 값을 import 할 때는 정확한 이름을 기재해야함
import { getJoin, postJoin, getLogin, postLogin } from "../controller/userController";
import { home, search } from "../controller/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);


//파일을 통째로 import 할 경우 사용
export default rootRouter;