import React from "react";

import style from './list.scss';

// 引入异步请求数据的组件
import { asyncRequestListData } from "../../../service/listService.js";
// import testData from "../../../service/listService.js";

/**
 *	1、 组件一加载就去请求网络获取数据--注意生命周期的问题
 *
 */
export default class list extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true, 
			reqParams: {
				type: "in_theaters",
				start: 10,
				count: 15,
				city: "深圳"
			},
			listData:[]//列表渲染的数据
		}
		this.renderFunc = this.renderFunc.bind(this);//可以更改里面的this的指向
		this.handleJumpToDetail = this.handleJumpToDetail.bind(this);
	}

	asyncGetData(){
		asyncRequestListData(this.state.reqParams)
			.then((response)=>{
				//将数据放到listData中
				this.setState({
					listData: this.state.listData.concat([], response.subjects),
					isLoading: false
				})

			}, (error)=>{
				console.log(error, "error");
			})
	}

	componentWillMount() {
		console.log(this, "componentWillMount............");
	}
//中间的位置是调用了render--调用了render的时候表明组件可见
	componentDidMount() {
		this.asyncGetData();

		// alert(this.state.isLoading);
	}

	//在外部传进来的参数发生改变的时候调用
	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		this.setState({
			isLoading: true,
			reqParams: {
				type: nextProps.route.path
			}
		});
		let timer = setTimeout(()=>{
			this.asyncGetData();
			clearTimeout(timer)
		}, 2000);

	}

	// 当state或者是props发生改变的时候都会触发此函数的调用
/*	shouldComponentUpdate(nextProps, nextState) {
		
	}*/

//根据上面的返回值判断是否调用这两个函数
	componentWillUpdate(nextProps, nextState) {
	}
//这两个函数的中间调用的是render
	componentDidUpdate(prevProps, prevState) {//在这里调用不就死循环了吗？--由于都走
	}
// 组件被移除了
	componentWillUnmount() {
	}

	renderLoading(){
		return (
			<div className={style.loading}>
				please waiting!!!!!
			</div>
			)
	}

	//如果需要使用context进行路由的跳转，需要进行属性校验
	static contextTypes = {
		router: React.PropTypes.object
	}

	//处理点击事件
	handleJumpToDetail(id, event) {
		
		//路由跳转
		console.log(id);

		this.context.router.push("/list/detail/" + id);
	}

	renderFunc(item){//拿不到this啊--在构造函数中处理

		// 另一种处理this指向的一个方式是：this.handleJumpToDetail.bind(this, prams1, prams2....)//没有bind直接传就是函数调用

		return (
			<li key={item.id + Math.random()}  className='item' onClick={()=>this.handleJumpToDetail(item.id +Math.ceil( Math.random()* 100) , event)}>
				<img src={item.images.medium}/>
				<div>
					<h2>影片名：{item.title}</h2>
					<p>主演：{item.casts.map((value, index)=>{return value.name + "  "})}</p>
					<p>类型：{item.genres.toString()}</p>
				</div>
			</li>
			)
	}

	renderLoaded(){
		return (
			<div className={style.loaded}>
				{/*列表渲染, 需要有唯一的id*/}
				<ul>
					{this.state.listData.map(this.renderFunc)}
				</ul>
			</div>
			)	
	}

	render() {
		return this.state.isLoading ? this.renderLoading() : this.renderLoaded();
	}
}


