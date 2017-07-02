
import React, {Component } from 'react';

import {connect} from 'react-redux';

// 导入展示组件
import Footer from './zzComponent/Footer.jsx';
import Input from './zzComponent/Input.jsx';


//导入动作的抽象
import {addTodo , addExtra, filterType} from './action.js';

/**
 * 应该还对其他的组件的引用，但是还应该对什么组件进行数据的传递呢？
 * 	此容器组件就是，可否定义多个容器组件呢？
 * 
 */


//这个做容器组件是否可行
//
/**
 * 定义一个方法，使得多层的后代都可以使用
 *
 * 
 */
class Container extends Component {
	constructor(props) {
		super(props);
		this.addText = this.addText.bind(this);
	}

	getChildContext() {
		let {dispatch} = this.props
		return {
			getMore: ()=>{
				let dataType = this.props.params.filterType=='All'?'getCity': 'getFunc';
				dispatch(addExtra(dataType))
			},
			filterType: this.props.params.filterType//这里会有一个延迟的现象，无法获取到当前实时的路由参数
		}
	}
	//需要校验后代的属性--需要传递给后代去校验的属性
	static childContextTypes= {
		getMore: React.PropTypes.func,
		filterType: React.PropTypes.string
	}

	addText(text) {//这里就处理dispatch为add的action
		this.props.dispatch(addTodo(text));
	}


	//需要监测一个路由的变化， 并将其写进redux里面
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps.params.filterType, "Container.jsx...........");
		this.props.dispatch(filterType(nextProps.params.filterType));
	}

	render() {
		/**
		 *  这些顶层组件  在路由发生变化的时候都无可避免的会被调用render函数更新组件，但是肯定是造成性能浪费的
		 *  
		 */
		let {dispatch} = this.props;
		console.log(this.props);
		return (
			<div>
				<Input onClick={this.addText} />
			{/*注意这里并不是直接的事件，所以应该是没有event的*/}
				{this.props.children}
				{/*展示show组件的*/}
				<Footer></Footer>
			</div>
			)
	}
}


//这个有必要成为容器组件么？--- 这个需要做出处理的就是 ADD和More两个事件---所以是可以成为容器组件的啊


export default connect()(Container);




