import express from "express"
import {
    watch, 
    getEdit, 
    postEdit,
} from "../controller/videoController"

const videoRouter = express.Router();


// (\\d+) -> digit 값만 받아온다
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.post("/:id(\\d+)/edit", postEdit);

export default videoRouter;