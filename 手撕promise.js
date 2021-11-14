/*同步promise **/
// class Promise {
//     constructor(executor) {
//         this.status = "pending"; //默认状态
//         this.value;
//         this.error;
//         //定义resolve
//         let resolve = res => {
//             if(this.status === 'pending') {
//                 this.value = res;
//                 this.status = 'resolved';
//             }
//         }
//         //定义reject
//         let reject = err => {
//             if(this.status === 'pending') {
//                 this.error = err;
//                 this.status = 'rejected';
//             }
//         }

//         //自动执行
//         executor(resolve, reject)
//     }
//     then(onFullfilled, onRejected) {
//         if(this.status === 'resolved') {
//             onFullfilled(this.value)
//         }
//         if(this.status === 'rejected') {
//             onRejected(this.error)
//         }
//     }
// }

/*异步promise **/
class Promise {
    constructor(executor) {
        this.status = "pending"; //默认状态
        this.value;
        this.error;
        this.resolveQueue = []; //成功存放的数组
        this.rejectQueue = []; //失败存放的数组
        //定义resolve
        let resolve = res => {
            if(this.status === 'pending') {
                this.value = res;
                this.status = 'resolved';
                // 一旦resolve执行，调用成功数组的函数
                this.resolveQueue.forEach(fn => fn())
            }
        }
        //定义reject
        let reject = err => {
            if(this.status === 'pending') {
                this.error = err;
                this.status = 'rejected';
                // 一旦reject执行，调用失败数组的函数
                this.rejectQueue.forEach(fn => fn())
            }

        }

        //自动执行
        executor(resolve, reject)
    }
    then(onFullfilled, onRejected) {
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};
        let promise2;
        promise2 = new Promise((resolve, reject) => {
            if(this.status === 'resolved') {
                setTimeout(() => {
                    
                    let x = onFullfilled(this.value)
                    // resolvePromise函数，处理自己return的promise和默认的promise2的关系
                    resolvePromise(promise2,x,resolve,reject)
                }, 0);
            }
            if(this.status === 'rejected') {
                setTimeout(() => {
                    
                    let x = onRejected(this.error)
                    resolvePromise(promise2,x,resolve,reject)
                }, 0);
            }
            if(this.status === 'pending') {
                this.resolveQueue.push(() => {
                    //异步
                    setTimeout(() => {
                        
                        let x = onFullfilled(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }, 0);
                })
                this.rejectQueue.push(() => {
                    setTimeout(() => {
                        
                        let x = onRejected(this.error)
                        resolvePromise(promise2,x,resolve,reject)
                    }, 0);
                })
            }
        })
        return promise2;
    }
    catch(onRejected) {
        return this.then(null, onRejected)
    }
}

function resolvePromise(promise2,x,resolve,reject) {
    //循环引用报错
    if(x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    //锁，防止多次调用
    let called;
    //x不是null且x是对象或者函数
    if (x!=null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            // A+ 规定，声明then = x的then方法
            let then = x.then;
            // 如果then是函数，就默认是promise了
            if(typeof then === 'function') {
                then.call(x, y => {
                    //成功和失败只能调用一个
                    if(called) return;
                    called = true;
                    // 核心点2：resolve 的结果依旧是 promise 那就继续递归执行
                    resolvePromise(promise2,y,resolve,reject);
                }, err => {
                    if(called) return;
                    called = true;
                    reject(err)
                })
            } else {
                resolve(x)
            }
        } catch(e) { //走到catch也属于失败
            if(called) return;
            called = true;
            reject(e)
        }
    } else {
        resolve(x)
    }
}

new Promise((resolve, reject) => {
    // console.log('执行成功');
    // resolve('成功啦')
    // reject('失败啦')
    resolve()
}).then(res => {
    console.log('进入第一个then!');
    return new Promise((resolve, reject) => {
        resolve('hello world')
    })
}, err => {
    console.log(err);

}).then(res => {
    console.log('进入第二个then!',res);
})
