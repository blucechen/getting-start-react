import React, { Component, PropTypes } from 'react'
import Todo from './Todo'


export default class TodoList extends Component {
  render() {
    console.log(this.props.todos);//数组装的是对象
    let res = {...this.props.todos[0]};
    console.log(res);
    return (
      //还是从父组件中获取到了内容啊，只是这里在一次进行了多一层的封装而已
      //不过map一个组件，666

      <ul>
        {this.props.todos.map((todo, index) =>
          <Todo {...todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)} />
        )}
      </ul>
    )
  }
}
/**
 *  //写法很是巧妙
 * 
 *  <Todo {...todo}/>
 *  不就相当于：
 *  text:
 *  completed:
 *
 * 
 */

//还是属性校验
TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}