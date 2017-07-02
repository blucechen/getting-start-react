//发起动作



//action类型
export const ADD_TODO =  "ADD_TODO";
export const COMPILE = "CONPILE";

//action函数
export const addTodo = (parms)=>{
	return {type: ADD_TODO, parms}
}

export const compile = (content)=>{
	return {type: COMPILE, content}
}





