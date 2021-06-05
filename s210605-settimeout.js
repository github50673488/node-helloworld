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
        console.log('1---------setImmediate------macro-task');
    }, 0);
    setTimeout(function () {
        console.log('2-------setTimeout----macro-task');
    }, 0);
    new Promise(function (resolve) {
        console.log('3----------new promise');
        resolve();
        console.log('4------after resolve');
    }).then(function () {
        console.log('5----------then');
    });
    console.log('6-----in script');
    process.nextTick(function () {
        console.log('7-------------nextTick');
    });
    console.log('8------------script end');

    // macro-task: script (整体代码)，setTimeout, setInterval, setImmediate, I/O, UI rendering.
    // micro-task: process.nextTick, Promise(原生)，Object.observe()，MutationObserver

// 除了script整体代码，micro-task的任务优先级高于macro-task的任务优先级。
// 其中，script(整体代码) ，可以理解为待执行的所有代码。

// //输出结果是3 4 6 8 7 5 2 1
});
