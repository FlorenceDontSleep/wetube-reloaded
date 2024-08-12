import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatarUrl: String,
    socialOnly: { type: Boolean, default: false },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true},
    location: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

//패스워드가 저장되기 전에 hash 해준다
userSchema.pre('save', async function () {
    // 패스워드가 변경되었다면 hash를 해준다
    // 기존 로직을 그대로 사용시 비디오를 업로드할 경우 hash된 비밀번호를 다시 hash해 로그인이 불가능하던 경우가 존재했음
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
})

const User = mongoose.model("User", userSchema);
export default User;