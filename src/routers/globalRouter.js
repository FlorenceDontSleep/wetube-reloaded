import express from "express";

//default가 아닌 값을 import 할 때는 정확한 이름을 기재해야함
import {join, login} from "../controller/userController";
import {trending, search} from "../controller/videoController";

const globalRouter = express.Router();


globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;