# 베이스 이미지를 Node.js 이미지로 설정
FROM node:20

# 작업 디렉토리 생성
WORKDIR /app

# 서버 디렉토리의 package.json을 컨테이너의 /app/server로 복사
COPY server/package.json ./server/
COPY server/package-lock.json ./server/

# 서버 디렉토리로 이동하여 의존성 설치
WORKDIR /app/server
RUN npm install

# 서버와 프론트엔드의 파일을 컨테이너로 복사
COPY frontend ./frontend/
COPY server ./server/

# 서버의 포트 설정
EXPOSE 3003

# 서버 시작
CMD ["npm", "start"]
