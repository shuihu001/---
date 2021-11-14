//generator+自动执行器
function getNum(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num+1)
        }, 1000);
    })
}

//自动执行器，如果一个Generator函数没有执行完，则递归调用
function asyncFun(func) {
    let gen = func();
    function next(data) {
        let result = gen.next(data);
        if(result.done) return result.value;
        result.value.then(function(data) {
            next(data)
        })
    }
    next();
}

// 所需要执行的Generator函数，内部的数据在执行完成一步的promise之后，再调用下一步
let func = function* () {
    let f1 = yield getNum(1);
    let f2 = yield getNum(f1)
    console.log(f2);
}

asyncFun(func)