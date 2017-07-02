//对抽象的行为进行抽象的响应

//这个才是store中所使用的数据，应该是构造出来的store，就是说此应该是对数据的表示
//也就是说：这个才是被create中构造的状态树



//注意store或者是状态state是根据传入的reducer而生成的


//这个应该包含的是共享的redux的数据--这个是列表的数据
function todos(state=[], action){
	// state 应该是一个对象： 对象包含了text,completed,id
		
	//判断action的类型--判断action提交的类型-这里不也是响应了行为吗？
	switch(action.type) {
		case "ADD":
			//你觉得传入的数据实体会放在那个位置呢--肯定是有action带过来的啊
			
			return [...state, {text: action.text, id: action.id, completed: false}]
		case "TOGGLE":
			//改变状态：--肯定是先找到，然后再动手
			let index = 0;
			for (var i = state.length - 1; i >= 0; i--) {
				if (index == state.id) {
					index = i;//数组中的位置，这是可以的啊
					break;
				}
			}

			return [
				...state.slice(0, index),
				Object.assign({}, state[index], {completed, action.completed}),
				...state.slice(index+1)
			]
		default :
			return state;
	}
}

//还需要处理setFilter这个抽象的行为




//应该还需要响应一个行为--那就是选择看那些内容--但是这个行为应该影响到列表才对的























