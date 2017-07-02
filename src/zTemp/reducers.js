/**
 * 决定动作的效果
 * 
 */


import { combineReducers } from 'redux'//组合打散的reduce

/**
 * 引入动作
 */
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'

const { SHOW_ALL } = VisibilityFilters


//两个函数都被触发了。。。。。。。。。。
/**
 * 
 *
 *  这里肯定是会触发的，由于你是组合起来的嘛，是通过combineRedux，所以才需要使用switch判断啊
 * 
 * 
 */
//这个函数返回的是一个字符串，不就相当于了这是一个字符串了吗？
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      console.log(action, "visibilityFilter.................chenjy..");

      // console.log(action, "chenjy.................visibilityFilter.reducers");
      return action.filter//这里从何处体现出了作用呢？
      //返回的确是只是一个字符串而已
    default:
      return state
  }
}


//就响应两种动作，一个是增加，一个是完成
//这个函数返回的是一个对象，不就相当于这是一个对象了吗？----综上，这里不就相当于使用一个字符串和一个对象去描述那个state了吗？
function todos(state = [], action) {
  console.log(action, ".................todos, .........cheny");
  // console.log(state, action, "chenjy............todos..reducers");
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true//会将之前的覆盖
        }),
        ...state.slice(action.index + 1)
      ]
    default:
    //都没有匹配的话，返回的是没有改动的数据啊
      console.log("not change...");
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp

/**

这个todos应用的共享数据结构应该是这样的：
  
  1、todos (这是一个数组)
  2、visibilityFilter(这是一个字符串)
  {
    将上面两个合并起来，得到一个对象，也就是state是一个对象，
    这个对象描述了todo 应用应该有的共享 的数据结构
  }


 */








