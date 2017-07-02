//纯入口文件---没有别的意思

import 'babel-polyfill'//保证了fetch 的正常工作

import React from 'react'
import { render } from 'react-dom'
import Root from './Root.jsx'

render(
  <Root />,
  document.getElementById('app')
)









