const http = require('http');
const fs = require

// http.createServer((req, res) => {
//     res.write('<h1>hello node!</h1>');
//     res.write('<p>hello sever</p>');
//     res.end('<p>roh</p>')
// })

// .listen(8080, () =>{
//     console.log('8080번 서버대기중.')
// });

// 예외 처리(에러 처리)
// const server = http.createServer((req, res) => {
//     res.write('<h1>hello node!</h1>');
//     res.write('<p>hello sever</p>');
//     res.end('<p>roh</p>')
// })

// .listen(8080);
// server.on('listening', () => {
//     console.log('8080번 서버대기중.')
// });
// server.on('error', (error) => {
//     console.log('error')
// });

// 문자열을 모르는 경우 (safari)
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'}); //문자열을 넣어준다.
//     res.write('<h1>hello node!</h1>');
//     res.write('<p>hello sever</p>');
//     res.end('<p>roh</p>')
// })
//     .listen(8080);
// server.on('listening', () => {
//     console.log('8080번 서버대기중.')
// });
// server.on('error', (error) => {
//     console.log('error')
// });

// html을 만들어 넣기
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'}); //문자열을 넣어준다.
    res.write('<h1>hello node!</h1>');
    res.write('<p>hello sever</p>');
    res.end('<p>roh</p>')
})
    .listen(8080);
server.on('listening', () => {
    console.log('8080번 서버대기중.')
});
server.on('error', (error) => {
    console.log('error')
});