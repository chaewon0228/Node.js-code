/**
 * 데이터베이스 사용하기
 * 몽고디비에 사용자 추가하기
 * 웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
 *    http://localhost:3000/public/adduser.html
 */

// Express 기본 모듈 불러오기
var express = require('express')
	, http = require('http')
	, path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
	, cookieParser = require('cookie-parser')
	, static = require('serve-static')
	, errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 몽고디비 모듈 사용
var MongoClient = require('mongodb').MongoClient;


// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret: 'my key',
	resave: true,
	saveUninitialized: true
}));

//===== 데이터베이스 연결 =====//

// 데이터베이스 객체를 위한 변수 선언
var database;

//데이터베이스에 연결
function connectDB() {
	// 데이터베이스 연결 정보
	var databaseUrl = 'mongodb://localhost:27017/local';

	// 데이터베이스 연결
	MongoClient.connect(databaseUrl, function (err, db) {
		if (err) throw err;

		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

		// database 변수에 할당
		database = db.db('local'); /*database명을 명시했다.*/
		// database = db;
	});
}

//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조
var router = express.Router();

// 로그인 함수 - 데이터베이스의 정보와 비교
router.route('/process/login').post(function (req, res) {
	console.log('/process/login 호출됨.');

	// 요청 파라미터 확인
	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;

	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

	// 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database) {
		authUser(database, paramId, paramPassword, function (err, docs) {
			if (err) { throw err; }

			// 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);

				// 조회 결과에서 사용자 이름 확인
				var username = docs[0].name;

				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();

			} else {  // 조회된 레코드가 없는 경우 실패 응답 전송
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
});



// 라우터 객체 등록
app.use('/', router);


// 사용자를 인증하는 함수
var authUser = function (database, id, password, callback) {
	console.log('authUser 호출됨 : ' + id + ', ' + password);

	// users 컬렉션 참조
	var users = database.collection('users');

	// 아이디와 비밀번호를 이용해 검색
	users.find({ "id": id, "password": password }).toArray(function (err, docs) {
		if (err) { // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
			callback(err, null);
			return;
		}

		if (docs.length > 0) {  // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
			console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
			callback(null, docs);
		} else {  // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
			console.log("일치하는 사용자를 찾지 못함.");
			callback(null, null);
		}
	});
}



//사용자를 추가하는 함수


var addUser = function (database, id, password, name, callback) {
	console.log('addUser 호출됨.');
	var users = database.collection('users');
	// id, password, username을 사용해 사용자 추가
	users.insertMany([{ "id": id, "password": password, "name": name }], function (err, result) {
		if (err) { // 오류가 발생했을 때 콜백 함수를 호출하면서 오류 객체 전달
			callback(err, null);
			return;
		}
		if (result.insertedCount > 0) {
			console.log("사용자 레코드 추가됨 : " + result.insertedCount);
		} else {
			console.log("추가된 레코드가 없음.");
		}
		callback(null, result);
	});
};

// 사용자를 추가하기 위한 라우팅 함수 추가
router.route('/process/adduser').post(function (req, res) {
	console.log('/process/adduser 호출됨.');
	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	var paramName = req.body.name || req.query.name;
	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

	// db 객체가 초기화된 경우, addUser 함수를 호출해 사용자 추가
	if (database) {
		addUser(database, paramId, paramPassword, paramName, function (err, result) {
			if (err) { throw err; }
			// 결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
			if (result && result.insertedCount > 0) {
				console.dir(result);
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();

			}
			else {
				res.writeHead('200', { 'Context-Type': 'text/html;charset=utf8' });
				res.write('<h2>3110 윤채원의 사용자 추가 실패🤯');
				res.end();
			}
		});
	}
	else {
		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
});


// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
	static: {
		'404': './public/404.html'
	}
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


//===== 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
	console.log("프로세스가 종료됩니다.");
	app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database) {
		database.close();
	}
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function () {
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

	// 데이터베이스 연결을 위한 함수 호출
	connectDB();

});

