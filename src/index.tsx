import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';

let reducers = combineReducers({userReducer})

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunkMiddleware)
));
  
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') 
);
