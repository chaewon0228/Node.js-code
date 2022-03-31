
var express = require('express');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser'), static = require('serve-static');
var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));

var router = express.Router();

// URL 안에 들어간 파라미터가 매핑되는 형식
//     /process/login/sunny => /process/login/:name
router.route('/process/login/:name').post(function(req, res) {
    console.log('/process/login/:name 처리함.');

    var paramName = req.params.name;

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
    res.write("<br><br><a href='/public/login3.html'>로그인 페이지로 돌아가기</a>");
    res.end();
    
    // http://localhost:3000/public/login3.html
    // =>http://localhost:3000/process/login/sunhee
    
});
app.use('/', router);

app.all('*', function(req, res) {
    res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});
// http://localhost:3000/public/aaa

http.createServer(app).listen(3000, function() {} );