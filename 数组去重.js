let array = [1,2,3,4,5,4,5,6,7,6,7,8,9,8]
//1.set
let array1 = [...new Set(array)]
console.log('array1',array1);
//2.创建新数组
let array2 = []
for(let i of array) {
    if(array2.indexOf(i) === -1) {
        array2.push(i)
    } 
}
console.log('array2',array2);
//3.双重循环
function three(arr) {
    for(let i = 0; i<arr.length; i++) {
        for(let j=i+1; j<arr.length; j++) {
            if(arr[i] == arr[j]) arr.splice(j,1)
        }
    }
    console.log('array3',arr);
    return arr;
}
three(array)