import express from "express"
import {see, edit, upload, deleteVideo} from "../controller/videoController"

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
// (\\d+) -> digit 값만 받아온다
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;