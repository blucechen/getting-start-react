/**
 * 样式：style
 *
 * 结构：html
 *
 * 行为：js
 *
 * 
 */


import React from "react";
import {Link} from "react-router";


import style from "./category.scss";

export default class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slide: ""
		};
		this.back = this.back.bind(this);
	}

	back(e){
		this.setState({
			slide: "toLeft"
		});
		setTimeout(() => {
			this.setState({
			slide: ""
		});
		}, 2000);
	}

	render() {
		return (
			<div className={style.category + " " + this.state.slide} onClick={this.back}>
				<ul >
					<li><Link to="/in_theaters">正在热映</Link></li>
					<li><Link to="/coming_soon">即将上映</Link></li>
					<li><Link to="/top250">top250</Link></li>
				</ul>
			</div>
			)
	}
}







