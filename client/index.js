import React from 'react'
import ReactDOM from 'react-dom'

/* Setup Redux */
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);


/* Components */
import App from './components/App'



ReactDOM.render(
    <Provider store={store}>
	<App />
    </Provider>
    , document.getElementById('root'))
