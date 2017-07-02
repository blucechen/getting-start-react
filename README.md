# ReactProject getting start

## 在渲染的时候标签是必须要要被正确的闭合
	- <div></div>   <div><div/>over
	- <input />

## 热替换是只能在组件中方可以生效，在app.jsx中好像是无法做到的



## flex实现三段式布局的时候，如果子代需要使用%，那么在flex中需要明确每一段的%高


## map和forEach的区别


## 模块导出-单独和默认

## fetch使用规范

## 字符串模板-中间不能有空格的


## 尾递归优化- 闭包


## 怎么去注入redux呢？




## 事件处理的方式
```
<a href='#' onClick={e => {
        e.preventDefault()
        this.props.onFilterChange(filter)
      }} />
<!-- 这也是一种思维方式 -->

//第二种--官方可能更为推荐这种，但是这种大量的传参不好传递
<a href='#' onClick={this.handleRefreshClick}> Refresh </a>
handler：//当然前面的在构造函数中还使用了bind绑定this
 handleRefreshClick(e) {//可以读取到当前的元素对象
    e.preventDefault()
    }
```
//数据地址
https://www.reddit.com/r/reactjs.json



## 奇妙的写法
```js

ref 如果是 一个函数的话，会将自身传进去，作为函数的参数
而事件会默认将event传进去作为参数


```




## demo描述
- redux的基本使用
	- reducer
	- action
	- 结合中间件applyMiddleWare- thunkMiddleWare
	- dispatch
	- redux调试
- 样式
	- 行内样式
	- scss引入： 样式的避免覆盖
- 通过context进行组件间通讯

- react-router的使用	
	- 懒加载组件











