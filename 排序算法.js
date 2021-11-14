let arr = [6,4,8,1,5,2,9]
//1.冒泡排序
function bubbleSort(arr) {
    let len = arr.length;
    for(let i = 0; i<len-1; i++) {
        for(let j=0;j<len-1;j++) {
            if(arr[j]>arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr;
}
console.log('bubbleSort(arr)',bubbleSort(arr)); 

//2.选择排序
function selectionSort(arr) {
    let len = arr.length;
    for(let i = 0; i< len-1;i++) {
        let min = i;
        for(let j = i+1; j< len-1;j++) {
            if(arr[j] < arr[min]) {
                min = j
            }
        }
        [arr[min], arr[i]] = [arr[i], arr[min]]
    }
    return arr;
}
console.log('selectionSort(arr)',selectionSort(arr)); 

//3.插入排序
function insertSort(arr) {
    let len = arr.length;
    for(let i =0;i<len-1;i++) {
        let temp = arr[i];
        let j = i;
        while(j>0 && arr[j-1] > temp) {
            arr[j] = arr[j-1]
            j--
        }
        arr[j] = temp
    }
    return arr
}
console.log('insertSort(arr)',insertSort(arr)); 

//4.希尔排序
function cellSort(arr) {
    let len = arr.length;
    let gap = Math.floor*(len/2);
    while(gap >= 1) {
        for(let i = gap; i<len; i++) {
            let temp = arr[i]
            let j = i;
            while(j>gap-1 && arr[j] < arr[j-gap]) {
                arr[j] = arr[j-gap]
                j-=gap
            }
            arr[j] = temp
        }
        gap = Math.floor(gap/2)
    }
    return arr;
}
console.log('cellSort(arr)',cellSort(arr)); 

//5.快排
function quickSort(arr) {
    if(arr.length<=1) {
        return arr;
    }
    let left = []
    let right = []
    let index = Math.ceil(arr.length/2);
    let middle = arr.splice(index,1)[0]
    for(let i = 0;i<arr.length;i++) {
        if(arr[i] < middle) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([middle],quickSort(right))
}
console.log('quickSort(arr)',quickSort(arr)); 