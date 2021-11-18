function getCount(arr) {
	var list = [];
	var num = 1;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] instanceof Array) {
			for (var j = 0; j < arr[i].length; j++) {
				list.push(arr[i][j]);
			}
		}
	}
    console.log(list);
	if (list.length) {
		num += getCount(list)
	}
	return num;
}
 
console.log("数组维度：" + getCount([1,[2,[8,8]],3,[9],4]));    // 数组维度：4
