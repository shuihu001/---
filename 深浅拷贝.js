var obj = {
    name : "abc",
    age: 123,
    card:['visa', 'master'],
    wife: {
        name: 'bcd',
        son: {
            name: "aaa"
        }
    }
}
//浅拷贝
function clone(origin) {
    if(typeof origin !== 'object') {return origin}
    let target = Array.isArray(origin) ? [] : {}
    for(let prop in origin) {
        if(!origin.hasOwnProperty(prop)) break;
        target[prop] = origin[prop]
    }
    return target;
}
let obj1 = clone(obj);
// console.log(obj1);

//深拷贝
function deepClone(origin) {
    if(typeof origin !== 'object') {return origin};
    let target = Array.isArray(origin) ? [] : {};
    for(let prop in origin) {
        if(origin.hasOwnProperty(prop)) {
            if(typeof prop == 'object') {
                deepClone(prop)
            } else {
                target[prop] = origin[prop]
            }
        }
    }
    return target;
}
let obj2 = deepClone(obj);
console.log(obj2);