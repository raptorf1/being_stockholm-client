import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './semantic/dist/semantic.min.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { Provider } from 'react-redux'
import configureStore from './state/store/configureStore'
import { setupInterceptors } from './Modules/axiosInterceptor'
import { verifyCredentials } from './reduxTokenAuthConfig'

setupInterceptors()

const loc = 'http://localhost:3002'
const her = 'https://being-stockholm.herokuapp.com'

axios.defaults.baseURL = her

const store = configureStore();
verifyCredentials(store)
window.store = store


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
