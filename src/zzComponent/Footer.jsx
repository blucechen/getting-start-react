import React, {Component} from 'react';

//导入links标签
import Links from "./Link.jsx";
import More from "./More.jsx";


const showType = ['All', 'Completed', 'Active'];
//就渲染四个

export default class Footer extends Component {


	static contextTypes = {
		filterType: React.PropTypes.string
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps, "receive  propsl...............")
		console.log(this.context, "shouldComponentUpdate  propsl...............");
	}

	shouldComponentUpdate(nextProps, nextState) {
		// console.log(nextProps, nextState, "Footer.......");
		return false;//这里没有更新的话，其下面的子组件都是无法更新的,
		//但是如果是路由参数无法及时传递进来的话，是否更新都无所谓了
	}

	render() {
		return (
			<div>
				{/*展示三个a标签*/}
				{
					showType.map((v,i)=>{
						return (
							<Links key={i} desc={v}/>
							)
					})
				}
				<More/>
			</div>
			)
	}
}


/**
 *	这个完全是可以写成一个容器组件的--但是好像没有必要--
 *	如果没有写成组件的话就可以从组件容器中将函数传递下来--
 *	这里应该涉及到一个context的东西来获取传递下来的内容
 *
 *
 * 
 * 
 //*/

