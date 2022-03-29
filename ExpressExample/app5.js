
var express = require('express'), http = require('http');
var app = express();

// 미들웨어에서 redirect 메소드 사용
// redirect : 웹 페이지 경로를 강제로 이동시킴.

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    res.redirect('http://google.co.kr');
});

http.createServer(app).listen(3000, function() {} );