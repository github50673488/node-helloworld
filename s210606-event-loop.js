// demo02
console.log('golb1'); // 第一步：宏任务script首先执行。全局入栈。glob1输出。

setTimeout(function () {// 第二步，执行过程遇到setTimeout。setTimeout作为任务分发器，将任务分发到对应的宏任务队列中。
    console.log('timeout1');
    process.nextTick(function () {
        console.log('timeout1_nextTick');
    })
    new Promise(function (resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function () {
        console.log('timeout1_then')
    })
})

setImmediate(function () { // 第三步：执行过程遇到setImmediate。setImmediate也是一个宏任务分发器，将任务分发到对应的任务队列中。setImmediate的任务队列会在setTimeout队列的后面执行。
    console.log('immediate1');
    process.nextTick(function () {
        console.log('immediate1_nextTick');
    })
    new Promise(function (resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function () {
        console.log('immediate1_then')
    })
})

process.nextTick(function () { // 第四步：执行遇到nextTick，process.nextTick是一个微任务分发器，它会将任务分发到对应的微任务队列中去。
    console.log('glob1_nextTick');
})

new Promise(function (resolve) { // 第五步：执行遇到Promise。Promise的then方法会将任务分发到对应的微任务队列中，但是它构造函数中的方法会直接执行。因此，glob1_promise会第二个输出。
    console.log('glob1_promise'); // glob1_promise会第二个输出
    resolve();
}).then(function () {
    console.log('glob1_then')
})

setTimeout(function () {// 第六步：执行遇到第二个setTimeout。
    console.log('timeout2');
    process.nextTick(function () {
        console.log('timeout2_nextTick');
    })
    new Promise(function (resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function () {
        console.log('timeout2_then')
    })
})

process.nextTick(function () { // 第七步：先后遇到nextTick与Promise
    console.log('glob2_nextTick');
})
new Promise(function (resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function () {
    console.log('glob2_then')
})

setImmediate(function () {// 第八步：再次遇到setImmediate。
    console.log('immediate2');
    process.nextTick(function () {
        console.log('immediate2_nextTick');
    })
    new Promise(function (resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function () {
        console.log('immediate2_then')
    })
})


// https://www.jianshu.com/p/12b9f73c5a4f# !!

// golb1
// glob1_promise
// glob2_promise      ------------- // 这个时候，script中的代码就执行完毕了，执行过程中，遇到不同的任务分发器，就将任务分发到各自对应的队列中去。接下来，将会执行所有的微任务队列中的任务。
//  -----//  end of global scrpt bun left micro task
// glob1_nextTick    -------其中，nextTick队列会比Promie先执行。nextTick中的可执行任务执行完毕之后，
// glob2_nextTick
// glob1_then                 ------ 才会开始执行Promise队列中的任务。
// glob2_then
// end of script run ,  now , find macro task queue 这个时候，script已经执行完毕，所以就从setTimeout队列开始执行

// setTimeout任务的执行，也依然是借助函数调用栈来完成，并且遇到任务分发器的时候也会将任务分发到对应的队列中去。 只有当setTimeout中所有的任务执行完毕之后，才会再次开始执行微任务队列。并且清空所有的可执行微任务
// timeout1
// timeout1_promise
// timeout1_nextTick
// timeout1_then
// timeout2
// timeout2_promise
// timeout2_nextTick
// timeout2_then


// immediate1
// immediate1_promise
// immediate1_nextTick
// immediate1_then
// immediate2
// immediate2_promise
// immediate2_nextTick
// immediate2_then
