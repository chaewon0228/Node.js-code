
let http = require('http');

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
    res.write('노드제이에스로부터의 응답 페이지');
    res.end();
}).listen(3000);