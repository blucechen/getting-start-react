

import config from "./basePath.js";

// 模块导出--支持单独和默认导出
export function asyncRequestListData(reqParams){
	let url = `${config["PROTOCOL"]}${config["HOST"]}:${config["PORT"]}/getMovieList?
		start=${reqParams.start}&
		count=${reqParams.count}&
		city=${reqParams.city}&
		type=${reqParams.type}`;

	return new Promise((resolve, reject)=>{
		//异步请求
		fetch(url,
		{
			method: "GET"
		})
		//可行性判断
		.then((response)=>{
			if(response.status == 200) 
				return response.json()
			
		}, (error)=>{
			console.log("error", error);
		})
		//成功回调
		.then((response)=>{
			resolve(response)
		})
		//失败回调
		.catch((error)=>{
			console.log(error, "catch");
			reject(error);
		})
	})
}
function asyncRequestMovieDetail(type){
	
}

export let testData = 123;

export default {
	asyncRequestListData,
	asyncRequestMovieDetail
}

// 非默认的需要在导入的时候写上相同的名字
// 默认的是不用的




