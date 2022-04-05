// Express 기본 모듈 불러오기
var express = require('express'), http = require('http'), path = require('path');
// Express 미들웨어 불러오기
var bodyParser = require('body-parser'), static = require('serve-static'), cookieParser = require('cookie-parser'), errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// Express 객체 생성
var app = express();
// 기본 속성 설정
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
// cookie-parser 설정
app.use(cookieParser());

// + 세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

//라우터 사용해 라우팅 함수 등록
var router = express.Router();

// 로그인 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출함.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if(req.session.user){
        console.log('이미 로그인되어 상품 페이지로 이동합니다.');
        res.redirect('/public/product.html');
    }
    else{
        // 세션 저장
        req.session.user = {
            id: paramId,
            name: '투마로우바이투게더',
            authorized: true
        };

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id : ' + paramId + '</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        // router.route('/process/product').get 으로 연결됨
        res.write("<br><br><a href='/process/product'>상품페이지로 이동하기</a>");
        res.end();
    }
});

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
router.route('/process/logout').get(function(req, res){
    console.log('/process/logout 호출됨');

    if(req.session.user){
        console.log('로그아웃합니다');

        req.session.destroy(function(err){
            if(err) { throw err; }

            console.log('세션을 삭제하고 로그아웃되었습니다.');
            res.redirect('/public/login2.html');
        });
    }
    else{
        console
    }
})
    
router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie 호출됨.');
    res.send(req.cookies);
});
    
app.use('/', router);
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function() {} );