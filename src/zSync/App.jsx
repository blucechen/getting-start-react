//基本引入：
import React from 'react';
import {render} from 'react-dom';


//redux
import {Provider } from 'react-redux';
import {createStore} from 'redux';

//导入container
import Container from "./Container.jsx";

//将reducer传入来
import ToDo from "./reducers.js";

let store = createStore(
	ToDo,
	//添加redux调试控制台
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);//生成唯一的store对象

let res = store.dispatch({
	type: "ADD",
	text:"store.....",
	id: 11
})
console.log(res);

render(
	<Provider store={store}>
		<Container />
	</Provider>,
	document.getElementById("app")
	)








