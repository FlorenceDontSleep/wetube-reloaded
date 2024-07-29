import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

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

app.use(
    session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    //세션을 수정 할 때에만 세션을 DB에 저장하고 쿠키를 설정
    //로그인 했을 경우에만 세션을 부여
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    })
);

app.use(localsMiddleware);
// static 설정을 해줘야 브라우저에서 해당 폴더의 파일을 확인할 수 있다
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;