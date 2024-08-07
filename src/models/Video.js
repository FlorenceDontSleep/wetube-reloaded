import mongoose from "mongoose";

//데이터의 형식을 정의해줌
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength:80 },
    fileUrl: { type: String, required: true },
    description: { type: String, required: true, trim: true, minLength: 20 },
    //Date.now()로 적지않는 이유는 ()가 있을경우 function이 즉시 실행된다.
    //default를 설정해주면 controller에서 지정해주지 않아도 된다.
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true},
        rating: { type: Number, default: 0, required: true},
    },
    // ObjectId는 js의 데이터 형식이 아닌 mongoose의 형식이기 때문에 밑의 코드와 같이 선언해줘야 작동한다.
    // owner에 무엇을 저장해줘야하는지 지정해줘야 한다.
    // 지정해줄때는 ref를 사용해서 지정해준다. (model User에서 온다고 지정해줌)
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static('formatHashtags', function(hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

//그 이후 model을 작성
//model은 이름, schema로 구성
const Video = mongoose.model("Video", videoSchema);
//model을 default로 export 함
export default Video;
