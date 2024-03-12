import mongoose from "mongoose";

/*
* mongodb에 연결
* useNewUrlParser 와 useUnifiedTopology는 Node.js 4.0.0 버전부턴 사용하지않음(효과가 없다)
*/ 
mongoose.connect("mongodb://127.0.0.1:27017/wetube");

const db = mongoose.connection;

//on은 여러번 발생가능, once는 반드시 한번만 발생함
const handleOpen = () => console.log("Connected to DB👌");
const handleError = (error) => console.log("DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);