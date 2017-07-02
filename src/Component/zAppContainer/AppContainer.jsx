
// 引入react包
import React from "react";

//需用从react-router中引入Link这个组件，实现页面跳转
import {Link} from "react-router";


import style from "./AppContainer.less";

console.log(style);//所有以:local()开头的类名


//肯定还需要添加很多的样式控制，你需要让用户知道点击了那个

//渲染
export default class AppContainer extends React.Component {
	render(){
		return (
			<div className={style['app-container']}>
				<div className='header'>
					<Link to="/home">首页</Link>
					<Link to="/list">列表</Link>
					<Link to="/about">关于我们</Link>
				</div>
				<div className='content'>
					{this.props.children}
				{/*也相当于路由的出口*/}
				</div>
				<div className='footer'>
					版权所有&copy;chen
				</div>
			</div>
			)
	}
}

/**
 *	1、 此处应该是整个页面的主题部分，装载所有的容器，组件
 *	2、请用flex布局实现--flex
 *	3、请使用css的正确的管理方式
 *		- 导入的样式	生成的是一个对象 ，对象里面是一个有属性
 *  	- dist生成的html中引入的style文件是一个带有md5值的文件
 *   	:local(selector...)  //这是可以解决选择器同名的问题，是使用与所有的结合webpack使用的项目
 *   		- 即便是同名了，但是由于其类名都被转成对应的随机值
 * 
 */



