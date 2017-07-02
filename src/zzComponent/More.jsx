
import React, {Component} from 'react';


//异步请求 数据---这是需要考虑的东西就更多了

export default class More extends Component {


	//校验祖宗的函数
	static contextTypes = {
		getMore: React.PropTypes.func,
		router: React.PropTypes.object,
		filterType: React.PropTypes.string//确实是会有一个延迟的问题存在
		//可能在设计的时候，由于是展示组件，你只需要报告事件就可以了，
		//至于一些系统相关参数由容器组件进行逻辑处理
		//
		//解决办法，可以使之成为容器组件，然后直接从redux中取出数据
	}

	componentDidMount() {
		// console.log(this.context);
	}

	render() {
		// console.log(this.context.router);
		// 这肯定是带有点击事件的啊---还应该带有请求数据类型过去的
		let {getMore} = this.context;
		// let {dataType} = this.props
		return (
				<button onClick={getMore}>More</button>
			)
	}
}









