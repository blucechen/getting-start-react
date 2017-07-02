
//组件基本导入
import React, {Component} from 'react';


export default class Test extends Component {

	constructor(props) {
		super(props);
		// this.handleClick = this.handleClick.bind(this);
		
	}

	componentDidMount() {
		var res = this.props;
		console.log(res);
	}

	handleClick(parms, event){

		// console.log(parms, event.target);
		console.log(this);
		console.log(this.refs.div);
	}

	render() {
		// 两个调用方式是不同的
			// <div onClick={()=>{this.handleClick('aaaa', event)}} ref="div">
		return (
			<div onClick={()=>{this.props.onTodoClick("div...click..."+ Math.random()*100)}} ref="div">
				hello test
				{this.props.list.map((v, i)=>{
					console.log(".......");
					return (
						<li key={v.id}>
							{v.text}
						</li>
						);
				})}
			</div>
			)
	}

}









