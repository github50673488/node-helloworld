console.log('golb1'); // 第一步：宏任务script首先执行。全局入栈。glob1输出。

setTimeout(function () {// 第二步，执行过程遇到setTimeout。setTimeout作为任务分发器，将任务分发到对应的宏任务队列中。
    console.log('timeout1');

    new Promise(function (resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function () {
        console.log('timeout1_then')
    })
})


new Promise(function (resolve) { // 第五步：执行遇到Promise。Promise的then方法会将任务分发到对应的微任务队列中，但是它构造函数中的方法会直接执行。因此，glob1_promise会第二个输出。
    console.log('glob1_promise'); // glob1_promise会第二个输出
    resolve();
}).then(function () {
    console.log('glob1_then')
})

setTimeout(function () {// 第六步：执行遇到第二个setTimeout。
    console.log('timeout2');

    new Promise(function (resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function () {
        console.log('timeout2_then')
    })
})


new Promise(function (resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function () {
    console.log('glob2_then')
})
