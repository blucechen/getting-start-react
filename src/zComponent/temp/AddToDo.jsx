import React, { Component, PropTypes } from 'react'

// onAddClick


export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={(e) => this.handleClick(e)}>
        {/*本质上这里还是调用了原生的点击事件*/}
         Add
        </button>
      </div>
    )
  }

  handleClick(e) {
    const node = this.refs.input
    const text = node.value.trim()
    this.props.onAddClick(text)
    /*这里不是一样的触发了父组件的事件吗？从而达到传递至的目的*/
    node.value = ''
  }
}


//又是属性校验
AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}