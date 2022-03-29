
var express = require('express'), http = require('http');
var app = express();

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');
    
    var person = {name:'txt', age:21};

    // 에러 1
    // res.send(personStr);
    // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
    // res.end(person);

    // 객체일 경우 2
    // var personStr = JSON.stringify(person);
    // res.writeHead('200', {'Content-Type':'application/json;charset=utf8'});
    // res.end(personStr);

    // 가능 3 - 한글 깨져서 나와서 X
    // var personStr = JSON.stringify(person);
    // res.end(personStr);

    // 실습 데이터는 html문자열 4
    // var personStr = JSON.stringify(person);
    // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    // res.end(personStr)

    // 실습 5
    // var personStr = JSON.stringify(person);
    // res.send(personStr);

    // 실습 6
    // res.send(person);

    // 실습 7
    // req.user = 'sunny';
    // res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    // res.end('<h1>Express 서버에서 ' + req.user + '를 res,wirteHead와 end로 응답한 결과입니다.</h1>');

    req.user = 'sunny';
    res.send('<h1>Express 서버에서 ' + req.user + '를 send로 응답한 결과입니다.</h1>');
}); 

http.createServer(app).listen(3000, function() {
   
});