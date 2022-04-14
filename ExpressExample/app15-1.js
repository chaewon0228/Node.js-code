// Express 기본 모듈 불러오기
var http = require('http'), path = require('path');

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

var cors = require('cors');
const { append } = require('express/lib/response');
const express = require('express');
// ----------------------------

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
app.use(static(path.join(__dirname, 'uploads')));

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

app.use(cors());

// multer 미들웨어 사용 : 미들웨어 사용 순서 중요 body-parser => multer => router
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads')
    },
    filename: function (req, file, callback) {
        //callback(null, file.originalname)
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname);
        callback(null, basename + Date.now() + extension);
    }
});
    
var upload = multer({ 
    storage: storage,
    limits: {
        files: 12,
        fileSize: 1024 * 1024 * 1024
    }
});


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
        res.write("<button style='background-color: aqua;'><a href='/photomulti3110.html'>파일업로드로 이동하기</a></button>");

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
    
// 파일 업로드 라우팅 함수 
router.route('/process/photo12').post(upload.array('photo12', 12), function(req, res) {
    console.log('/process/photo12 호출됨.');
    
    try {
        var files = req.files;
        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '', filename = '', mimetype = '', size = 0;
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

        if(files.length > 12) {
            res.write('<h3>Too many files!!! 파일을 줄이세요📸</h3>');
        }

        if (Array.isArray(files)) { 
            console.log("배열에 들어있는 파일 갯수 : %d", files.length);

            for (var index = 0; index < files.length; index++) {
                console.dir('#===== 업로드된 '+ (index + 1) + '번째 파일 정보 =====#')
    
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
    
                console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
    
                // 클라이언트에 응답 전송
                res.write('<h3>3110윤채원님 ' + (index + 1) + '번째 파일 업로드 성공</h3>');
                res.write('<hr/>');
                res.write('<p>원본 파일명 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
                res.write('<p>MIME TYPE : ' + mimetype + '</p>');
                res.write('<p>파일 크기 : ' + size + '</p>');
                res.end();
            }
            res.write("<br><br><button style='background-color: bisque;'><a href='/product.html'>상품페이지로 이동하기</a></button>");
        } 
    }
    catch(err){
        console.dir(err.stack);
    }
});

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