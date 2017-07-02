/**
 * 需要在这里想清楚  此项目的 共享的数据结构问题
 *
 * 	todo 官方建议的就两个数据：这两个数据应该是可以包含所有的从
 * 		此两个数据中出发的， 通过某个逻辑处理然后可以获取到所需要的数据
 * 		应该是根本的数据
 *
 * 
 */

//导入redux
import {combineReducers } from "redux";



//这个才是真正的表现redux数据结构


//注意:这里的state就是之前的状态，你应该为这个开始的状态进行一个默认的赋值
//这个state是一个数组，里面是展示todolist的，所以应该包含每一个todo的所以d信息，text，id，completed
// 这是一个纯的函数，相同的输入，相同的输出，而且对于state是不在原来的基础上改变的，而是克隆一份在进行修改的
let todoList = (state=[], action) =>{

	//这是你处理那些逻辑呢？----可以从action中获取dispatch中分发过来的action类型

	switch(action.type) {
		case 'ADD': 
			return [...state, {id: action.id, completed: false, text:action.text}];
		case 'TOGGLE' :
			//处理开关的，你是否应该知道是那一个被动了--map
			return state.map((value, index)=>{
				if (value.id == action.id) {
					return Object.assign({}, value, {completed: !value.completed});
				}
				return value;
			});

		default:
			return state;//默认处理
	}
}


let visibilityType = (state="ALL", action)=>{

	//就处理一个函数就可以 了
	switch(action.type){
		case 'SETVISIBLE':
			return action.showType;
		default :
			return state;
	}
}


//结合起来--由于state 是一个唯一的对象--当然这里还需要使用creat生成store传递到其他的组件中使用

export default combineReducers({
	todoList,
	visibilityType
})























