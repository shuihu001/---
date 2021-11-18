//传入一个函数作为参数
function curry(func) {
    //形成闭包，将func函数传入到ruturn出去的函数中
    return function curried(...args) {
        //(...args)是剩余参数，该写法会将参数转化为数组的形式。
        //详见：[MDN剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)
        //判断args参数的长度 与 func函数的长度
        if (args.length >= func.length) {
            //若args>=func，直接return执行func
            return func.apply(this, args); //此处使用apply是因为apply的第二个参数是数组的形式
        } else {
            //若args<func，return的新的函数，该函数递归执行curried函数。
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        };
    };
};

function a(a,b,c) {
    return a+b+c

}
let aaa = curry(a)
console.log(aaa(1,2)(3));

//其他变形
function myAdd(...args) {
        return function (...args2) {
            if(args2.length>0) {
                return myAdd.apply(this, args.concat(args2));
            } else {
                let sum = 0;
                args.concat(args2).forEach(i => sum+=i)
                return sum
            }
        };
    }
console.log(myAdd(1,2,3)(5)(4));
