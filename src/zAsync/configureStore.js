//导入

import { createStore, applyMiddleware,compose  } from 'redux'
import thunkMiddleware from 'redux-thunk'//这个才是真正的中间件
// import createLogger from 'redux-logger'//不用这个中间件
import rootReducer from './reducers'//但是这里并没有使用请求
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//用于调试




//中间件
// 通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数
// 当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行


// const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  console.log(preloadedState);//这个应该是没有store的时候用来初始化的--此时由于没有传，所以是undefined
  return createStore(//创建store 的时候写法还是一样呢的，只是你需要将应用的中间件通过applyMiddleware处理异步的数据
    rootReducer,
    preloadedState,
    composeEnhancers(
    	applyMiddleware(//redux提供的应用中间件的函数---使用了thunkMiddleware中间件
		      thunkMiddleware //这是其中一个中间件--是应用了中间件，但是好像并没有跟reducer关联起来啊
		      // loggerMiddleware
		    )
    	)
   

  )
}