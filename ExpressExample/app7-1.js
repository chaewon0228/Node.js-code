
var express = require('express');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser'), static = require('serve-static');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());
//redirect에서는 ./ 또는 / 이 public을 가리킴(앞에서 선언에 따라)
app.use('/', static(path.join(__dirname, 'public')));

// 미들웨어에서 파라미터 확인
app.use(function(req, res){
    console.log('첫번째 미들웨어에서 요청을 처리함');
    //index.html 이 있는경우
    //res.redirect('/');// =>index 가 나옴
    // http://localhost:3000

    //login.html 이 있는경우
    //res.redirect('./login.html');//login.html 가 나옴
    //res.redirect('/login.html');//login.html 가 나옴
    // http://localhost:3000/login.html

    res.redirect('./login.html'); 
    res.end();
});

http.createServer(app).listen(3000, function() {} );