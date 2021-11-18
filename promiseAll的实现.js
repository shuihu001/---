function diPromiseAll(promises){
    return new Promise((resolve, reject)=>{
        // 参数判断
        if(!Array.isArray(promises)){
            throw new TypeError("promises must be an array")
        }
        let result = [] // 存放结果
        let count = 0 // 记录有几个resolved
        promises.forEach((promise, index) => {
            promise.then((res)=>{
                result[index] = res
                count++
                count === promises.length && resolve(result) // 判断是否已经完成
            }, (err)=>{
                reject(err)
            })
        })
    })
}

