//对项目可能的行为进行抽象

let todoId = 1;//但是这里是否可以全局使用还未知，但是从词法作用域出发应该是可以的

//对可能的参数进行抽象，对应该此行为应该产生的结果进行抽象返回
export const add = (text)=>{
	// 为了避免覆盖，这里可能需要一个id进行处理
	return {
		type: "ADD",
		todoId: todoId++,
		text
	}
}


export const toggle = (id)=>{
	return {
		type "TOGGLE",
		id
	}
}

//此行为就是通过返回相对应的字符串就可以了啊，
//		---我只要知道应该过滤什么了就可以了--
//不是， 上面明显是错的，这里是抽象行为，并没有对行为做出处理， reducer才是处理行为的
export const setVisibility = (filter) => {
	return {
		type: "SETFILTER",
		filter
	};
}











