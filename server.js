// server.js
/*
const express = require('express');
const path = require('path');
const apiRouter = require('./server/routes/api');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.static(path.join(__dirname, './frontend')));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/index.html'));
});

app.get('/busan', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/busan.html'));
});

app.get('/daegu', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/daegu.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/

const express = require('express');
const path = require('path');
const apiRouter = require('./server/routes/api');

const app = express();
const PORT = process.env.PORT || 3003;

// 쿠키 설정을 위한 미들웨어 추가
app.use((req, res, next) => {
    res.cookie('exampleCookie', 'exampleValue', {
        httpOnly: true, // JavaScript에서 접근 불가능
        secure: true, // HTTPS에서만 쿠키 전송
        sameSite: 'None' // 크로스 사이트 요청에 쿠키 전송 허용
    });
    next();
});

app.use(express.static(path.join(__dirname, './frontend')));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/index.html'));
});

app.get('/busan', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/busan.html'));
});

app.get('/daegu', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/daegu.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
