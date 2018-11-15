import { combineReducers } from 'redux'

/* Vendor reducers */

/* My reducers */
import profileReducer from './profile.reducer'


/* Combine all reducers into one big state.
   The result is passed to the Provider in ../src/index.js */
export default combineReducers({
    profile: profileReducer,
})


