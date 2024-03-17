import mongoose from "mongoose";

//데이터의 형식을 정의해줌
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String }],
    meta: {
        views: Number,
        rating: Number,
    },
});

//그 이후 model을 작성
//model은 이름, schema로 구성
const Video = mongoose.model("Video", videoSchema);
//model을 default로 export 함
export default Video;
