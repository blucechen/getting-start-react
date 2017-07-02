//将行为都抽象出来

//理应导入fetch
import fetch from 'isomorphic-fetch';

//addTodo--应该是尽量少的携带信息
export const addTodo = (text)=>{
	return {
		type: "ADD",
		text
	}
}

//toggle
export const toggle = (id) =>{
	return {
		type: 'TOGGLE',
		id
	}
}

//置于选择那个显示可以根据路由来显示--但是由于你是抽象动作，而不是具体的执行动作，
//你只要将动作所对应的效果描述出来就可以了
export const filterType = (filterType) => {//此动作也是同步的操作
	return {
		type: 'FILTERTYPE',
		filterType
	}
}

//这是对异步请求数据的状态描述--同理修改的也就是{isLoading的数据}
export const isLoading = (isLoading) => {
	// console.log(`loading status................${isLoading}`);
	return {
		type: 'ISLOADING',
		isLoading
	}
}

//发送所有todo的数据--理应是一个数组--如果没有结果应该返回一个null 数据
export const requestArr = (todoArr) => {//这个不是由组件直接发，而是由中间件发出去
	return {
		type: 'REQUESTARR',
		todoArr
	}
}

/**
 * 在reducer中永远都是只处理同步的请求，但是在action中利用thunk-middleware可以处理异步的执行，
 * 		其原理不就是通过中间件执行返回的函数，在返回的函数里面在进行分发正常的action，
 * 			从而被reducer响应，从而修改结果
 * 
 */
export const addExtra = (dataType) =>{//--可以接受参数啊
	//此处返回的就不是对象了，而应该是一个函数，同时是交给thunk-middlerware去处理的

	return function (dispatch) {//会将dispatch传进去
		
		//在这里你还是可以dispatch--同样可以进行分发--需要对数据结构进行重构

		//在请求之前，先发一个action，这个action是指示了当前的请求状态--请求中
		dispatch(isLoading(true));

		//下面的有点像tco--但是好像又不是--如果 这里不是return又该怎么样呢？？？？？？？？？？？----------
		return fetch(`http://localhost:8088/${dataType}.json`)
			.then((response)=>{
				if (response.status==200) {
					return response.json();
				}
			})
			.then((data)=>{
				//还继续分发一个内容
				// console.log(data);

				//问题来了，这个状态是应该在这里发，还是在reducer中自行改变呢？
				//我觉得还是应该在这里发，由于recuer是一个纯的函数，其不应该做其他的处理--就单单是做出对arr数据改变的处理就好了
				dispatch(isLoading(false));
				
				dispatch(requestArr(
					data.map((value, index)=>{
						return value.text;
					})
				))
			})
			.catch((error)=>{
				dispatch(isLoading(false));
				dispatch(requestArr(null))
			})
	}
}














