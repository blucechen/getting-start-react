//基本引入：
import React, {Component} from 'react';


//容器组件---注意应该使用react-redux中的connect去生成

//导入connect
import {connect } from "react-redux";

// 导入展示组件
import Text from "./zComponent/test.jsx";

//引入action
import {AddTodo} from './action.js';

/**
 * 容器组件是不应该手写，而是应该借助connect生成，从而可以将对应的
 * 
 */
class Container extends Component {

	//读取context：需要进行属性校验
	static contextTypes = {
		store: React.PropTypes.object
	}
	componentDidMount() {
		console.log(this.context);//果然是可以通过context访问到store的
		console.log(this.props);//没有通过conncet是没有任何的数据的
		console.log(this.context.store.getState());
	}

	render() {
		//不就可以从这里将数据传进去了吗？
		let {list, onTodoClick} = this.props;// 可以的啊
		console.log(list, '..........');
		return (
			<div>
				<Text list={list} onTodoClick={onTodoClick}/>
			</div>
			)
	}
}

/**
 * 传入的是两个函数，用于将state分发到props，和将dispatch分发到组件中
 *
 * 	注意：只要使用了conncet的方式将component进行wrap就可以在组件中获取到对应的dispatch函数
 */

let mapStateToProps = (state)=>{//对象里面有两个属性
	return {
		list: state.todoList
	}
}

//如何将事件
let mapDispatchToProps = (dispatch) => {
	return {
		onTodoClick: (text) => {
			console.log(text);
			dispatch(AddTodo(text));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);








