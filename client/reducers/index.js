import { combineReducers } from 'redux'

/* Vendor reducers */

/* My reducers */
import utilsReducer from './utils'
import profileReducer from './profiles'


/* Combine all reducers into one big state.
   The result is passed to the Provider in ../src/index.js */
export default combineReducers({
    utils: utilsReducer,
    profile: profileReducer,
})


