import React, {Component} from 'react';



/**
 * 注意查看官方的代码
 *
 * 
 */

export default class Input extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	componentDidMount() {
		// console.log(this.refs.btn);
	}

	render() {
		// 处理事件
		// console.log(this.props);//为什么这里会一直被更呢？---由于是组件一直都在顶级都容器中
		// 这些代码真是写得太好了
		let input;
		return (
			<form onSubmit={
				e=>{
					e.preventDefault();
					if (!input.value.trim()) {
						return;
					}
					this.props.onClick(input.value.trim())
					input.value='';
				}
			}>
				<input type='text' ref={node=>{input=node}}/>
				<button type='submit' ref='btn'>add</button>
			</form>
			)
	}
}






