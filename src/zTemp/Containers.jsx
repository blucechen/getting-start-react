/**
 * 容器组件----容器组件
 */

import React, { Component, PropTypes } from 'react'

//react-redux导入
import { connect } from 'react-redux';//导入的是一个函数--是一个高阶函数，这个函数里面是返回的一个函数，
//在官方建议中，这个函数是用来生成 容器组件 的

//action 中抽象了三种行为-一种是添加，一种是完成，一种是选择显示那些类型的数据
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions.js';

//展示组件
import AddTodo from './zComponent/AddTodo';
import TodoList from './zComponent/TodoList';
import Footer from './zComponent/Footer';

class App extends Component {

  componentWillMount() {
    console.log(this.props, "will. mounte...............");
  }

  componentWillUpdate(nextProps, nextState) {
      console.log(nextProps, "will update .........."); 
  }

  render() {
    /**
     *	 Injected by connect() call://通过最后的connect将下面对象中的内容注入
     *
     *		但是这个注入式针对于todo还是通用的呢？--应该是处理dispath以外都是特有的，但是为什么要这样注入呢？
     *        - 这些值从哪里而来呢？--从下面的select而来
     *
     *    使用了 mapStateToProps或者是mapDispatchToProps 注入而来的---用于从容器组件中往展示组件中注入
     */
    const { dispatch, visibleTodos, visibilityFilter } = this.props//这些都是 从connect 而来的
    // console.log(this);
  //这里好像并没有使用mapDispathToProps注入，而是直接使用了dispath进行注入
    /*自定义事件，可能是用来事件分发, 将事件传递到子组件中，然后子组件的触发这些事件，从而将内容传递到父组件中*/
  	/*todos: 不就是父组件像子组件传递参数吗？*/
    return (
      <div>
      {/*三个展示组件*/}
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          } />  
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    )
  }
}

//属性校验，无所谓，当然如果需要写在里面的话，静态方法
App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

//容器组件----用于逻辑校验，逻辑处理，展示组件应该 也是纯的组件，其只与输入有关，相同的输入应该是相同的输出，更reducer一样，是纯的
function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.

function select(state) {//这个函数的返回值数据从上面selectTodos而来--
  // 这是怎么调用的呢？
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
 /* return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
  }*/
}

// connect(select)//还是一个函数


// 没有对事件进行分发到组件中
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)
// export default connect()(App)

/**
 *
 *   - dispatch确实是会自动注入到容器组件中，
 *   - 但是redux的其他的state如果需要注入到容器组件中的话，则需要选择mapStateToProps-当然这里是可以通过传入的state访问到全部的store状态
 *   - 如果需要将分发的action注入到展示组件中，则可以使用 mapDispatchToProps---当然你这里由于是可以访问到了dispatch，所以是可以直接采用将
 *     - 将展示组件触发容器组件的方法达到修改数据的目的。
 *     - state状态树并没有自动的传到容器组件中，这是需要注意的
 * 
 */


//  mapStateToProps （这是一个函数） 将当前的Redux store state映射到组件的props中
//    visibleTodoList 需要计算传到TodoList中的todos，所以定义了根据state.visibilityFilter
//      来过滤state.todos的方法，并在mapStateToProps 中使用












