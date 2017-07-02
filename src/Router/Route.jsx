/**
 *	create by @chen
 * 
 */

//引入  react 包
import React , {Component} from "react";

// router包也是有必要的---注意引入的问题问题---其中link相当于了代替a标签的组件
import {Router, Route, Link, browserHistory, IndexRoute, Redirect} from "react-router";

import AppContainer from "../Component/zAppContainer/AppContainer.jsx";
import Home from "../Component/zHomeContainer/HomeContainer.jsx";


// 应该是对组件采用异步加载---此外getComponent应该还有很多的功能--这里的拆分组件和vue是不同的
const ListContainer = (location, cb) => {
  	require.ensure([], function(require){
	  	cb(null, require("../Component/zListContainer/ListContainer.jsx").default)
	 }, "list")
}

const About = (location, cb) =>{
	require.ensure([], (require)=>{
		cb(null, require("../Component/zAboutContainer/zAboutContainer.jsx").default)
	}, "about")
}

const ListItem = (location, cb)=>{
	require.ensure([], (require) => {
		cb(null, require("../Component/zListContainer/list_list/list.jsx").default)
	}, "list-item")
}

const Detail = (location, cb)=>{
	require.ensure([], (require)=>{
		cb(null, require("../Component/zListContainer/list_detail/detail.jsx").default)
	}, "detail")
}


//使用路由
export default class Routers extends Component {

	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={AppContainer}>
					<IndexRoute component={Home} />
					<Route path="home" component={Home} />
					<Route path="list" getComponent={ListContainer}>
						{/*这里有什么解除ui接触的*/}
						<IndexRoute getComponent={ListItem}></IndexRoute>
						<Route path="/in_theaters" getComponent={ListItem}></Route>
						<Route path="/coming_soon" getComponent={ListItem}></Route>
						<Route path="/top250" getComponent={ListItem}></Route>
						<Route path="detail/:id" getComponent={Detail}></Route>
					</Route>
					<Route path="about" getComponent={About} />
				</Route>
				<Redirect from='*' to='/' />
			</Router>
			)
	}
}







/**
 *	- 在最外层包裹一个Router，里边是具体的子代路由, 
 *		-  这个外层的Router中需要指定使用history的那个模式来开发-这里使用的是browserHistory
 *  - 包裹在里面的Route也是组件，属性就是相对应的path- component  ---maybe需要有一个IndexRoute
 *  - 一般包裹在Router最外侧的Route都是/，也就是自然匹配，里面的在嵌套的可以使用IndexRouter
 *  - 每个Route如果内有嵌套其他路由，要有路由出口
 *
 *	- 路由无法匹配时的处理方式-- 很是奇妙的处理方式
 *		- 可以使用Redirect   from * to /tagetRouter     指向指定的路由
 *  - Link中的内容需要有对一个的Route才会显示的
 *  - 拆分异步组件与vue是不相同的
 *  - 是不建议在组件里面继续新建文件夹，在定义组件的，组件本来是解耦的松散的组合-- 好像不是这样的
 *  
 * 
 */
