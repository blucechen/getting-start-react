

import React from 'react';

export default class Items extends React.Component {
	
	// map没数据就不会进循环的

	renderWhenNotData() {
		return (<span></span>)
	}

	//所有的js代码都写在{}里面
	/*renderWhenExitData(todoList){
		return todoList.map((value, index)=>{
				return (
					<li key={value.id}>{value.text}</li>
					)
			})
	}*/
	render() {
		let {todoList, itemOnClick} = this.props
		// console.log(this.props);

		//控制样式

		if (!todoList.toString())
			return this.renderWhenNotData()
		return (
			<ul>
				{
					todoList.map((value, index)=>{
						return (
							<li key={value.id} onClick={()=>itemOnClick(value.id)}
							style={{
								textDecoration: value.completed?'line-through': 'none',
								cursor: 'pointer'
							}}
							>{value.text}</li>
							)
					})
				}
			</ul>
			)
	}
}







