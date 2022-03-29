
var express = require('express'), http = require('http');
var app = express();

// 코드에서 파라미터는 get 요청에 대해서만 처리 가능함(post는 req.body 객체 참조)

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');

    var userAgent = req.header('User-Agent');
    var paramName = req.query.name;
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>User-Agent : ' + userAgent + '</p></div>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.end();

});

http.createServer(app).listen(3000, function() {} );