/**
 *
 *  注意本质问题： 这里都是 都是返回一个对象，函数是知识为了返回对象而已，这个是根本
 *  	action与构造action的函数
 * 
 */


//抽象行为：

let index = 0;//不知道是否可以使用

// return 传递的数据尽可能的少


//增加
export const AddTodo = (text) => {
	console.log(index, '................index........');
	return {
		type: "ADD",
		// completed: false,//官方的建议不传，确实是没必要传，默认不就是false吗
		text,
		id: index++
	}
}


//开关--返回的应该也是一个对象啊--此动作是会传递到展示组件中使用的，所以应该尽可能的简单，脱离耦合
//就向上报告 动作就可以了，对动作是不做任何的处理，而且传递的数据尽可能的简单
export const Toggle = (id) => {
	return {
		type: "TOGGLE",
		id
	}
}


// 展示那个类型的数据
export const setVisible = (showType)=>{
	return {
		type: "SETVISIBLE",
		showType
	}
}






/**
export function fetchPosts(subreddit) {

  return function (dispatch) {
    dispatch(requestPosts(subreddit))。
    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(response => response.json())//这个的返回值确实是应给promise
      .then(json =>
        dispatch(receivePosts(subreddit, json))
      )//整个的fetch的返回值仍然是promise值吗？
  }
}

store.dispatch(fetchPosts('reactjs'))//执行完毕以后，就没有什么事了啊，
// 只能标明上面方法的执行结果是应给promise类型的对象。
// 但是是否所有的dispatch方法执行的结果返回值都是一个promise对象呢--
//   - 不是的，这里应该是只有是thunk 处理的才是一个promise，普通的好像就是返回了添加进去的内容
	 - 这里的返回值应该是由那个传进去的函数的返回值决定的，而不是thunk
//而且这个中间件处理了以后应该是会将传进去的函数执行了


store.dispatch(fetchPosts('reactjs')).then(()=>{
	console.log('.......');
})
fetchPosts('reactjs')--->这个函数的返回值是一个函数，这个函数
会被thunk middleware去处理， 这里把 dispatch 方法通过参数的形式传给函数
但是核心就在于middleware究竟有没有调用了返回的函数呢？





//*/