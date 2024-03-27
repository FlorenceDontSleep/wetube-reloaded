import express from "express";

//default가 아닌 값을 import 할 때는 정확한 이름을 기재해야함
import { join, login } from "../controller/userController";
import { home, search } from "../controller/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);


//파일을 통째로 import 할 경우 사용
export default globalRouter;