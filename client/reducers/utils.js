var INITIAL_STATE = {
    showModal: "",
    error: "",
    notification: "",    
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
	case 'TOGGLE_MODAL':
	    const modal = action.payload
	    /* If this modal is already open I toggle it off. */
	    const alreadyOpen = state.showModal === modal 
	    return {...state, showModal: alreadyOpen ? false : modal }
	case 'NOTIFICATION':
	    return {...state, notification: action.payload}
	case 'ERROR':
	    return {...state, error: action.payload}
	case 'FETCH_PROFILE':
	    /* Successfully fetched profile, remove error message, close modal. */
	    return state
	    /* return {...state, showModal: "", error:""} */
	case 'LOGOUT':
	    return {...state, notification: "Logout successful."}
	default:
	    return state
    }
}

/* 
   case 'UPDATE_OPTION':
   return {...state, ...action.payload}
 */
