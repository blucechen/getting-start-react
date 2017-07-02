
import React from "react";

import style from "./search.scss";


export default class Search extends React.Component {

	render() {
		return (
			<div className={style.search}>
				<input type="text" placeholder="输入点什么" />
				<input type="button" value="search" />
			</div>
			)
	}
}





