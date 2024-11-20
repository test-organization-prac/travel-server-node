const dbConfig = {
  HOST: process.env.DB_HOST || "localhost", // RDS 호스트
  USER: process.env.DB_USER || "root",      // 데이터베이스 사용자 이름
  PASSWORD: process.env.DB_PASSWORD || "",  // 데이터베이스 비밀번호
  DB: process.env.DB_NAME || "testdb",      // 데이터베이스 이름
  PORT: Number(process.env.DB_PORT) || 3306 // 데이터베이스 포트
};

export default dbConfig;
