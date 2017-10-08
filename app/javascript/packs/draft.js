import "draft/styles.scss"

import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import loggerMiddleware from "redux-logger"
import { createBrowserHistory } from 'history'
import { Route } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { HeaderCont } from "draft/containers/header"
import { MainCont } from "draft/containers/main"
import { rootReducerObject } from "draft/reducers/root"


const history = createBrowserHistory()
const reactRouterMiddleware = routerMiddleware(history)

const rootReducer = combineReducers({
  ...rootReducerObject,
  router: routerReducer,
})

// https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    reactRouterMiddleware,
    thunkMiddleware,
    loggerMiddleware
  ))
)

const App = () => (
  <div>
    <HeaderCont />
    <MainCont />
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector("#root")
)
