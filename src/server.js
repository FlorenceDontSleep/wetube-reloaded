import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

//어플리케이션 작성
const PORT = 4000;

const app = express();
const logger = morgan("dev");
//pug를 view engine으로 사용
app.set("view engine", "pug");
//views의 기본 디렉토리는 현재 프로젝트의 views로 설정되어있음
//밑의 설정으로 views 폴더를 읽어오는 위치를 수정해줌
app.set("views", process.cwd() + "/src/views");
//주소 "/"를 받으면 function 실행
//use를 get보다 먼저사용해야함
//모든 route에서 use를 사용한다.
app.use(logger);
//express가 form의 value를 js object로 확인할수 있게함
app.use(express.urlencoded( {extended: true} ));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
    console.log(`Server listening on port http://localhost:${PORT}`);

//4000번 포트로 접속하면 function 실행
app.listen(PORT, handleListening);