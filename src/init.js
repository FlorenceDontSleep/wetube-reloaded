import "dotenv/config";
//dbs파일 자체를 import함
import "./db";
//db 연결이 성공했을때 Video를 import함
import "./models/Video";
import "./models/User";
import app from "./server";

//어플리케이션 작성
const PORT = 4000;


const handleListening = () =>
    console.log(`Server listening on port http://localhost:${PORT}`);

//4000번 포트로 접속하면 function 실행
app.listen(PORT, handleListening);