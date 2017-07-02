
import React, {Component} from 'react';

// 导入link
import {Link} from 'react-router';

import style from './Link.scss';


export default class Links extends Component {

	render() {
		let {desc} = this.props;
		return (
			<Link to={'/' + desc} className={style['linkFilter']}>
				{desc}
			</Link>

			)
	}


}





