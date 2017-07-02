//导入核心包
import {createStore, combineReduces, applyMiddleware} from "redux";

import thunk from "redux-thunk";

let store = createStore(
	combineReduces(),
	applyMiddleware(thunk)

	)
