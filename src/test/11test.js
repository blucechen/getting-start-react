/*	function sum(x, y) {
		"use strict";
	    if (y <= 0) {
	    	console.trace();
	      	return x;
	    }
	    return sum(x + 1, y - 1);
	}*/

	function fTail(n, a, b) { 
		"use strict";//开启严格模式以后都无法使用设置函数默认值
		if (n === 0) {
			console.trace();
			return a;
		}
		return fTail(n - 1, b, a + b)
	}

	/*function tailCall(n){
		return fTail(n + 1, 0, 1);
	}*/
	
	console.log(fTail(1000001, 0, 1));


	// console.log(sum(1, 1000000));
