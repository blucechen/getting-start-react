/**
 * 整个的需要共享的数据结构都是需要预先定义好了的--想清楚了 
 *
 *  注意：这里的数据结构根据官方的文档而已，是不好的的，只是为了演示的方便而已
 *    更好的可能是形成根据主键查询的，类似于数据库数据查询一样
 * 
 */


/**
 *  下面的数据结构大概就是
 *    string
 *    obj
 *    两种
 *
 *  reducer可是没有异步的操作，有的是action生成函数中，reducer都是同步更新数据
 * 
 */

import { combineReducers } from 'redux'//结合在一起的工具而已
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from './actions'//无所谓的常量


//这里 是如何处理异步的 api 的呢？
/**
 *  还是一样，在这里并没有什么异步的处理，或者或者说这里本没有什么异步
 *
 *  其都是对正常的action进行处理而已，至于有可以那些异步的action，也就是返回不是对象而是函数的action函数
 *  这里都是不知道的，其就是正常的处理所有的正常的action就可以了
 *    非正常的action的内部还是dispatch出正常的数据
 *
 *  reducer没有不正常的，
 *    不正常的action内部都是分发出正常的action，当然对于不正常的action，是通过了thunk-middleware来处理了
 */


//应该就是选中了那个需要显示的条目---明显是一个string
function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
  case SELECT_SUBREDDIT:
    return action.subreddit
  default:
    return state
  }
}


//这个可不是直接写到数据中的内容，而是被嵌套调用的reducer而已
function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

// REQUEST_POSTS
//是一个对象--调用了上面的post函数，形成嵌套-或者就是简单的调用而已
//这仅仅使用 reducer 组合 而已！我们还可以借此机会把 reducer 分拆成更小的 reducer，
//这种情况下，我们把对象内列表的更新代理到了 posts reducer 上
function postsBySubreddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({//接受的是一个-对象
  postsBySubreddit,//注意这里是函数啊
  selectedSubreddit
})

export default rootReducer//返回的也是一个函数



/**
 *
 * 数据结构
{
  selectedsubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application Using React JS and Flux Architecture'
        }
      ]
    }
  }
}
 */