
import React, {Component} from 'react';

import {Router,Route, browserHistory, IndexRoute, Redirect} from 'react-router'

import Container from './Container.jsx';
// import All from './zzComponent/All.jsx';
import Show from './zzComponent/Show.jsx';
// import Show from './zzComponent/Show.jsx';



//组件懒加载的实现
/*const Detail = (location, cb)=>{
	require.ensure([], (require)=>{
		cb(null, require("../Component/zListContainer/list_detail/detail.jsx").default)
	}, "detail")
}
<Route path="detail/:id" getComponent={Detail}></Route>*/

export default class Routers extends Component {
	render(){
		/*return (
			<Router history={browserHistory}>
				<Route path='/' component={Container}>
					<IndexRoute component={All} />
					<Route path="all" component={All}/>
					<Route path='completed' component={Completed}/>
					<Route path='active' component={Active} />
				</Route>
			</Router>//设计思想就错了----你导航的只有一个组件啊，
			你这样三个路由了，导航到了三个组件中，有意思吗--应该是动态路由，导航到同一个组件中，只是这个组件
				根据不同的参数进行不同的编译而已
			)*/
		return (
			<Router history={browserHistory}>
				<Route path='/' component={Container}>
					<IndexRoute component={Show} />
					<Route path='/(:filterType)' component={Show} />
				</Route>
				<Redirect from='*' to='/'/>
			</Router>
			)
	}
}
/**
 *<IndexRoute component={Show} />
	<Route path='/(:filterType)' component={Show} />
 *
 *<Route path="/hello/:name">         // 匹配 /hello/michael 和 /hello/ryan
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/michael 和 /hello/ryan
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/path/to/hello.jpg
 * 
 */






