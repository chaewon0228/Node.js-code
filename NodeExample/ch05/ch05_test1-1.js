var http = require('http');

// 웹 서버 객체 만들기
var server = http.createServer();

// 웹 서버를 시작해 3000번 포트에서 대기하도록 한다.
var host = '10.96.124.83';
var port = 3000;

//server.listen(port, function() {
server.listen(port, host, '50000', function() {
    console.log('웹 서버가 시작되었습니다. ->' + host + ':' +port);
})