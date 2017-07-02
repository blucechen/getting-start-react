
//基本引入
import React from 'react';
import {render} from 'react-dom';

//导入provider：
import {Provider } from 'react-redux';
import {createStore} from 'redux';

//导入reducer
import reducersFunc from './reducers.js';
import Container from './Container.jsx';


//创建store
const store = reducersFunc();


//应该是路由啊
import Routers from './routers.jsx'


render(
	<Provider store={store}>
		<Routers />
	</Provider>,
	document.getElementById('app')
	)




