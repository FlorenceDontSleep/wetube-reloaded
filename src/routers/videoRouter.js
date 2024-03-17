import express from "express"
import {
    watch, 
    getUpload,
    getEdit, 
    postEdit,
    postUpload,
    
} from "../controller/videoController"

const videoRouter = express.Router();


// (\\d+) -> digit 값만 받아온다
videoRouter.get("/:id(\\d+)", watch);
// GET request를 받으면 getEdit으로 보내고, POST request를 받으면 postEdit으로 보냄
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);


export default videoRouter;