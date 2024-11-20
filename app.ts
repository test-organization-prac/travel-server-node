import express from "express";
import kakaoRouter from "./router/kakao";
const cors = require("cors");
const app = express();
const { swaggerUi, specs } = require("./module/swagger");

// 로컬 개발 환경에서만 dotenv 로드
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // .env 파일 로드
}

app.use(express.json()); // JSON 바디 파서 추가
app.use(cors());
app.set("port", process.env.PORT || 8000);

app.use("/auth", kakaoRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번에서 대기중");
});
