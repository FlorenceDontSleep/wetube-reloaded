import express from "express"
import {
    watch, 
    getUpload,
    getEdit, 
    postEdit,
    postUpload,
    deleteVideo,
    
} from "../controller/videoController"
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouter = express.Router();


// (\\d+) -> digit 값만 받아온다
// ([0-9a-f]{24}) -> 24자의 길이의 0~9 , a~f의 문자열만 받아온다
// 24자리 hexadecimal의 정규식(regular expression)
videoRouter.get("/:id([0-9a-f]{24})", watch);
// GET request를 받으면 getEdit으로 보내고, POST request를 받으면 postEdit으로 보냄
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
// multer를 사용하기 위해, view의 input의 name을 가져와서 사용해줌
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);


export default videoRouter;