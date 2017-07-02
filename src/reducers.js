import {combineReducers, applyMiddleware, compose, createStore} from 'redux';


//引入中间件
import thunkMiddleware from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//用于调试

//数据结构--应该是最为原始的数据，其他的所有的数据都是可以根据此而推算出啦的
/**
 * {
 *    {	
 *    	  isLoading: false//但是 此处的数据结构该如何拼接呢？总不能是所有的数据结构都是扁平的
 *    	  [] :数组-存储着每一条的数据
 *    }
 *    filter：字符串-需要过滤的信息
 * }
 *
 *	//上述对象就三个数据而已
 * 
 */



//处理这里的数据结构---只有filterType和data是顶级的对象
/**
 * 这里可以先采用 官方的方案---使用combineReducers进行合并-然后再合并到另一个上，
 * 		当然，这里最终的结果好像就是使用原生的一样而已
 *
 * 
 */
//字符串---就响应一种就可以了
const filterType = (state='ALL', action)=>{
	
	switch(action.type){
		case 'FILTERTYPE':
			return action.filterType;
		default :
			return state;
	}
}


//加载状态--isLoading---响应
const isLoading = (state=false, action) =>{
	switch(action.type){
		case 'ISLOADING':
			return action.isLoading;
		default :
			return state;
	}
}

// 每个arr里的对象结构
/**
 * {
 * 		text,
 * 		completed,
 *   	id,
 * }
 */

// let index--由于是纯的，那么就不应该依赖于外部的内容

//todolist数组的数据---由于是数据的修改，多种的action都修改了arr的数据，
//so 这里应该是响应多种action的
const todoList = (state=[], action)=>{
	switch(action.type){
		case 'ADD'://添加一个对象而已
			return [
				...state,
				{	
					id: state.length,
					completed: false,
					text: action.text
				}
			];
		case 'TOGGLE'://结果是多个对象的数组
			return state.map((value, index)=>{
				if (value.id == action.id) {
					return Object.assign({}, value, {completed: !value.completed})
				}
				return value;
			})
		case 'REQUESTARR': //此返回的是一个数组啊，需要注意,
		//但是这个数组的数据结构和这里的原本的不一样啊--其只有text一项，没有其他的了

			//先找出原来的长度，然后再添加id
			const preArrLength = state.length;
			console.log(action.todoArr, "reducer.................");
			let requestArr = action.todoArr.map((value, index)=>{
				return {
					id: preArrLength + index,
					completed: false,
					text: value
				}
			});
			return [...state, ...requestArr];
		default : 
			return state;
	}
}

const todoData = combineReducers({
	isLoading,
	todoList
})

const allData = combineReducers({
	todoData,
	filterType,
})


const createStoreFunc = () => createStore( allData, composeEnhancers( applyMiddleware( thunkMiddleware ))) 

//回头再看上面的模式可否替换
export default createStoreFunc



