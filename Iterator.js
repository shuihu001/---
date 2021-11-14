function getIteratoe(list) {
    let i = 0;
    return {
        next: function() {
            let done = (i >= list.length)
            let value = !done ? list(i++) : undefined;
            return {
                done: done,
                value, value
            }
        }
    }
}

//部署Iterator接口
var iterableObj = {
    items:[100,200,300],
    [Symbol.iterator]:function(){
    var self=this;
    var i = 0;
    return {
        next: function() {
            var done = (i >= self.items.length);
            var value = !done ? self.items[i++] : undefined;
            return {
                done: done,
                value: value
            };
        }
    };
    }
}
//遍历它
for(var item of iterableObj){
    console.log(item); //100,200,300
}