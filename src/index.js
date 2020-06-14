import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter/Counter'
import counter from './components/Counter/reducers/counter'

import ReactTest from './components/ReactTest'
import ReduxCounter from './components/Redux1/index';

const store = createStore(counter)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <div>
    1.初体验Redux
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />
    2.测试React
    <ReactTest textProps={222}/>
    3.深入迁出redux
  <ReduxCounter caption='first'/>
  <ReduxCounter caption='second'/>
  <ReduxCounter caption='third'/>

  </div>,
  rootEl
)

render()
store.subscribe(render)
