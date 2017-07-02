
import React from "react";

export default class Detail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			movieId : "",
			name: "zhangsan"
		}
	}
	componentWillMount() {
		
	}

	//生命周期函数
	componentDidMount() {
		console.log(this.props.params.id);//还是对生命周期不熟啊，你一旦动了state，那么剩下的是就是react的事情了
		let timer = setTimeout(()=>{
			this.setState({
				movieId: this.props.params.id
			})
		}, 1000);
	}

	componentWillReceiveProps(nextProps) {
		
	}

	render() {
		return (
			<div>
				hello detail!!!
				<h1>
					{this.state.movieId}
				</h1>
			</div>
			)
	}


}




