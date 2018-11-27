import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

/* Setup Redux */
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

/* Components */
import App from './components/App'


ReactDOM.render(
    <Provider store={store}>
	<App />
    </Provider>
    , document.getElementById('root'))
