/*
1.创建空js对象{}
2.链接该对象到原型
3.绑定this
4.返回新对象
**/
function new_object() {
    let obj = new Object()
    //获得构造函数:删除并拿到arguments的第一项
    let Con = [].shift.call(arguments)
    //链接到原型
    obj.__proto__ = Con.prototype
    //绑定this,执行构造函数
    let result = Con.apply(obj, arguments)
    //确保new出来的是个对象
    return typeof result === 'object' ? result : obj;
}

//改变一个对象的[[prototype]]属性非常耗性能,所以推荐写法
function create() {
    //1.获得构造函数，同时删去arguments中第一个参数
    Con = [].shift.call(arguments)
    //2.创建空对象并链接到原型
    let obj = Object.create(Con.prototype);
    //3.绑定this实现继承
    let ret = Con.apply(obj, arguments)
    return ret instanceof Object ? ret : obj;
}