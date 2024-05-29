import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    socialOnly: { type: Boolean, default: false },
    avatarUrl: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true},
    location: String,
});

//패스워드가 저장되기 전에 hash 해준다
userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 5);
})

const User = mongoose.model("User", userSchema);
export default User;