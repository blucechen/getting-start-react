
// 引入react
import React from "react";


// 引入组件
import Search from "./list_search/search.jsx";
import Category from "./list_category/category.jsx";
import Detail from './list_detail/detail.jsx';


import style from "./ListContainer.scss";



export default class ListContainer extends React.Component {
	render() {
		return (
			<div className={style['ListContainer']}>
				<Category />
				<Search />
				{this.props.children}
			</div>
			)
	}



}
