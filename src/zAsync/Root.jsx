//根组件---用于创建store，和分发store

import React, { Component } from 'react'
import { Provider } from 'react-redux'//
import configureStore from './configureStore'
import AsyncApp from './AsyncApp.jsx'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}