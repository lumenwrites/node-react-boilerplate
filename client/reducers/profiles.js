/* import { DEFAULT_PROFILE } from '../utils/initialData' */

const INITIAL_STATE = {
    email: "",
    prefs: {}
}

/* Create and modify state. Passing initial state and actions. */
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
	case 'FETCH_PROFILE':
	    var profile = action.payload
	    console.log("[profile.reducer] Fetched profile", profile.email)
	    return profile
	case 'UPDATE_PROFILE':
	    var profile = action.payload
	    console.log("[profile.reducer] Updated profile",profile)
	    return  {...profile, modified:false}
	case 'LOGOUT':
	    return  INITIAL_STATE
	default:
	    return state
    }
}
