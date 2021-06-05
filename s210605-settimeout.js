const http = require('http');

const hostname = '127.0.0.1';
const port = 9527;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {

    setImmediate(function () {
        console.log(1);
    }, 0);
    setTimeout(function () {
        console.log(2);
    }, 0);
    new Promise(function (resolve) {
        console.log(3);
        resolve();
        console.log(4);
    }).then(function () {
        console.log(5);
    });
    console.log(6);
    process.nextTick(function () {
        console.log(7);
    });
    console.log(8);

// //输出结果是3 4 6 8 7 5 2 1
});
