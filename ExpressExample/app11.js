
var express = require('express');
var http = require('http');
var path = require('path');

var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser'), static = require('serve-static');
var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
// cookie-parser 설정
app.use(cookieParser());

// +
//라우터 사용해 라우팅 함수 등록
var router = express.Router();
router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie 호출함.');

    // 쿠키 설정
    res.cookie('user', {
        id: 'YJ',
        name: '연준',
        authorized: true
    });
    // redirect로 응답
    res.redirect('/process/showCookie');
});
//
    
router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie 호출됨.');
    res.send(req.cookies);
});
    
app.use('/', router);

var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
    static: {
    '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function() {} );