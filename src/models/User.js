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
});

//패스워드가 저장되기 전에 hash 해준다
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5);
})

const User = mongoose.model("User", userSchema);
export default User;