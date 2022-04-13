
var expressSession = require('express-session');

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
var cors = require('cors');
const { append } = require('express/lib/response');
const express = require('express');

// 
var http = require('http'), path = require('path');
var bodyParser = require('body-parser'), static = require('serve-static');
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// public 폴더와 uploads 폴더 오픈
app.use(static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

// cookie-parser 설정
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

// router 사용하여 라우팅 함수 등록
var router = express.Router();

// 파일 업로드 라우팅 함수 - 로그인 후 세션 저장함
router.route('/process/photo12').post(upload.array('photo12', 12), function(req, res) {
    console.log('/process/photo12 호출됨.');
    
    try {
        var files = req.files;
        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '', filename = '', mimetype = '', size = 0;
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

        if (Array.isArray(files)) { 
            console.log("배열에 들어있는 파일 갯수 : %d", files.length);

            if(files.length > 12) {
                res.write('<h3>Too many files!!! 파일을 줄이세요📸</h3>');
            }
            else{
                for (var index = 0; index < files.length; index++) {
                    console.dir('#===== 업로드된 '+ (index + 1) + '번째 파일 정보 =====#')
    
                    originalname = files[index].originalname;
                    filename = files[index].filename;
                    mimetype = files[index].mimetype;
                    size = files[index].size;
    
                    console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
    
                    // 클라이언트에 응답 전송
                    res.write('<h3>' + (index + 1) + '번째 파일 업로드 성공</h3>');
                    res.write('<hr/>');
                    res.write('<p>원본 파일명 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
                    res.write('<p>MIME TYPE : ' + mimetype + '</p>');
                    res.write('<p>파일 크기 : ' + size + '</p>');
                    res.end();
                }
            }
        } 
    }
    catch(err){
        console.dir(err.stack);
    }
});

app.use('/', router);

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