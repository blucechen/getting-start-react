/*//程序入口

//引入基本包
import React,{Component} from 'react';
import ReactDOM, {render} from 'react-dom';

// 引入通用样式
import "./Style/base.scss"

// 引入路由
import Routers from "./Router/Route.jsx";


//渲染组件-- 入口组件-- 一般就是引入路由
ReactDOM.render(
    <div>
        <Routers></Routers>
    </div>,
    document.getElementById('app')
)
*/

// redux 入门使用 start。。。。。。。。。。。。。。。。。。。

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Container from './Containers.jsx'//容器组件
import todoApp from './reducers.js'//reduces相关操作

let store = createStore(todoApp);//对象
console.log(store.getState());
// console.log(store, "..............store.chenjy");
// console.log(Container, "..................container.chenjy.");//返回一个函数啊
//此处使用Provider 是为了可以使得所有的组件都可以访问store
//Provider组件是react-redux提供
render(
  <Provider store={store}>
    <Container />
  </Provider>,
	document.getElementById('app')  
)
// container容器组件
// 		- 容器组件里面的都是展示组件 
// 			- 展示组件里面的数据都是根据容器组件中传递进去的数据进行渲染，而没有直接使用redux里面的内容，
// 		- 重点是容器组件是怎么使用到redux的内容呢？

















