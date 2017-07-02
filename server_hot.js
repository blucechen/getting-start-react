var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config.hot');
var proxyMiddleware = require('http-proxy-middleware')

//对外请求
const request=require('request');

var app = express();
var compiler = webpack(config);

//热重载
app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	inline: true,
	progress: true,
	stats: {
		colors: true,
	}
}));

//代理服务器
app.use('/shopro', proxyMiddleware({
    target: 'http://dev.fe.ptdev.cn',
    changeOrigin: true,
}))

app.use(require('webpack-hot-middleware')(compiler));

// middleware  config  start
app.use((req,res,next)=>{
    // 增加了cors跨域的请求头--这里好像不用也是可以的
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
})

//好像确实是可以当中间件啊
app.get("/getMovieList", (req, res, next)=>{
//从 req.query中获取就可以了
	console.log(req.query);
	let url = `https://api.douban.com/v2/movie/${req.query.type}?start=${req.query.start}&count=${req.query.count}&city=${req.query.city}`;
	console.log(url);

	// let url = "https://api.douban.com/v2/movie/in_theaters?start=10&count=15&city=深圳";
			// https://api.douban.com/v2/movie/in_theaters?start=10&count=15&city=深圳
	//发起请求是request
	/*request(url, (error,response, body)=>{
		// console.log(body);
		res.send(body)
	})*/

	res.send({
		"count": 15,
		"start": 10,
		"total": 25,
		"subjects": [
			{
				"rating": {
					"max": 10,
					"average": 6.8,
					"stars": "35",
					"min": 0
				},
				"genres": [
					"剧情",
					"动作",
					"犯罪"
					],
				"title": "缉枪",
				"casts": [
					{
						"alt": "https://movie.douban.com/celebrity/1340456/",
						"avatars": {},
						"name": "白举纲",
						"id": "1340456"
					},
					{
						"alt": "https://movie.douban.com/celebrity/1312979/",
						"avatars": {
							"small": "https://img3.doubanio.com/img/celebrity/small/14640.jpg",
							"large": "https://img3.doubanio.com/img/celebrity/large/14640.jpg",
							"medium": "https://img3.doubanio.com/img/celebrity/medium/14640.jpg"
						},
						"name": "连奕名",
						"id": "1312979"
					}
				],
				"collect_count": 795,
				"original_title": "缉枪",
				"subtype": "movie",
				"directors": [
					
				],
				"year": "2017",
				"images": {
					"small": "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2461747793.webp",
					"large": "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2461747793.webp",
					"medium": "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2461747793.webp"
				},
				"alt": "https://movie.douban.com/subject/26801782/",
				"id": "26801782"
			}
		]
	});

// middleware  config  end
});

app.get('/getCity.json', (req, res, next)=>{
	let timer = setTimeout(()=>{
		res.sendFile(__dirname + '/src/data/getCity.json');
		clearTimeout(timer);
	}, 2000);
})
app.get('/getFunc.json', (req, res, next)=>{
	
	let timer = setTimeout(()=>{
		res.sendFile(__dirname + '/src/data/getFunc.json')
		clearTimeout(timer);
	}, 2000);
})


//将其他路由，全部返回index.html
app.get('*', function(req, res) {
	res.sendFile(__dirname + '/index.html')
});

app.listen(8088, function() {
	console.log('正常打开8088端口   hot......')
});
