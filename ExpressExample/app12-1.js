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


// ++
app.use(static(path.join(__dirname, 'public')));
//
// app.use('/public', static(path.join(__dirname, 'public')));


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
        res.redirect('/product.html');
    }
    else{
        // 세션 저장
        req.session.user = {
            id: paramId,
            name: '윤채원',
            authorized: true
        };

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id : ' + paramId + '</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        // router.route('/process/product').get 으로 연결됨
        res.write("<br><br><button style='background-color: bisque;'><a href='/product.html'>상품페이지로 이동하기</a></button>");
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
            res.redirect('/login2.html');
        });
    }
    else{
        console.log('아직 로그인 되어있지 않습니다.');
        res.redirect('/public/login2.html');
    }
})
    
// 상품정보 라우팅 함수
router.route('/process/product').get(function(req, res) {
    console.log('/process/product 호출됨.');
    if(req.session.user){
        res.redirect('/public/product.html');
    }
    else{
        res.redirect('/public/login2.html');
    }
});
app.use('/', router);

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// express 서버 시작
http.createServer(app).listen(3000, function() {
    console.log('Express server listening on port' + app.get('port'));
} );