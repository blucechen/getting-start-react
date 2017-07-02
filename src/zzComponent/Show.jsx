import React, {Component} from 'react';

import {connect} from 'react-redux';


//在导入一个action
import {toggle} from '../action.js';


//导入itme组件
import Items from './Items.jsx';

//中间展示的todos列表---当然这肯定也是一个容器组件
class Show extends Component {
	
	//先渲染列表
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps,"show...........");
	}

	renderWhenLoading() {//简直就是跟编程带来了极大的便利，这。。。。。。
		//你只需要考虑数据就可以了。。。。至于view层的变化根本就不用考虑。。。。
		return (
			<div>
				loading.......
			</div>
			)
	}

	// 这里肯定是要处理获取filterType---根据filterType进行数据的过滤
	render() {
		// console.log(this.props, "Show.jsx.................");
		let {todoList, dispatch, isLoading} = this.props;
		// console.log(<Items todoList={todoList}/>);//返回地是一个react元素-是一个对象，
		// 所以在返回class返回的时候，render不能是返回一个数组


		if (isLoading) {
			return this.renderWhenLoading();
		}

		//这应该还需要将一个是否完成的事件处理函数传递过去---对请求状态进行处理，
		return (
			<div>
				<Items todoList={todoList} itemOnClick={id=>dispatch(toggle(id))}/>
			</div>
			)
	}
}

const filterTodoList = (todoList, filterType) => {
	switch(filterType){
		case "All":
			return todoList;
		case "Completed": 
			return todoList.filter(v => v.completed);
		case "Active": 
			return todoList.filter(v => !v.completed);
		default: 
			return todoList;
	}
}

//问题来了，在这种情况下，如何去获取路由或者其他的数据呢？
//其可以接受两个参数，这个不就解决了吗？
const mapStateToprops = (state, ownProps)=>{
	// console.log(ownProps, "ownProps");
	return {
		todoList: filterTodoList(state.todoData.todoList, ownProps.routeParams.filterType),
		isLoading: state.todoData.isLoading,//这俩个就不用过滤了
		filterType: state.filterType
	};
}




const ShowContainer = connect(mapStateToprops)(Show);

export default ShowContainer;


