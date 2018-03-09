import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import burgerReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = store =>{
  return next => {
    return action => {
      console.log('[Middleware] dispatching: ', action)
      const result = next( action )
      console.log('[Middleware] next state: ', store.getState() )
      return result
    }
  }
}

const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer
})

const store = createStore( rootReducer, composeEnhancers(
  applyMiddleware( logger, thunk )
))

const app = (
  <Provider store = { store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
