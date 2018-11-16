import axios from 'axios'

/* Fetch profile */
export const fetchProfile = () => async dispatch => {
    const config = { headers:  { authorization: localStorage.getItem('token')} }
    const res = await axios.get('/api/v1/profiles/profile', config)
    const profile = res.data
    /* dispatch({ type: 'FETCH_PROFILE', payload: profile }) */
}

/* Update profile */
export const updateProfile = (profile) => async dispatch => {
    const config = { headers:  { authorization: localStorage.getItem('token')} }
    const res = await axios.post('/api/v1/profiles/profile', profile, config)
    const updatedProfile = res.data
    /* console.log('Updated profile on server, received it back', updatedProfile) */
    dispatch({ type: 'UPDATE_PROFILE', payload: updatedProfile })
}


/* Auth */
/* Email/Password Signup */
export const signup = (credentials) => async dispatch => {
    console.log("sending credentials",credentials)
    /* Send email/password, receive profile and jwt back */
    const res = await axios.post('/api/v1/profiles/password/signup', credentials)
    if (!res.data.error) {
	console.log("[profiles.actions] Signed up", res.data)
	/* Save token to local storage */
	localStorage.setItem('token', res.data.token)
	/* Send profile to redux  */
	dispatch({ type: 'FETCH_PROFILE', payload: res.data })
	dispatch({ type: 'SET_NOTIFICATION', payload: "Signup successful!" })
    } else {
	console.log("[profiles.actions] Sign up error", res.data)
	dispatch({ type: 'ERROR', payload: res.data.error })
    }
}

/* Email/Password Login */
export const login = (credentials) => async dispatch => {
    /* Send email/password, receive profile and jwt back */
    const res = await axios.post('/api/v1/profiles/password/login', credentials)

    if (!res.data.error) {
	console.log("[profiles.actions] Logged in", res.data)
	/* Save token to local storage */
	localStorage.setItem('token', res.data.token)
	/* Send profile to redux  */    
	dispatch({ type: 'FETCH_PROFILE', payload: res.data })
	dispatch({ type: 'SET_NOTIFICATION', payload: "Login successful!" })
    } else {
	dispatch({ type: 'ERROR', payload: res.data.error })
    }
}

export const logout = (history) => {
    localStorage.removeItem('token')
    history.push('/')
    console.log("[profiles.actions] Logged out. Deleted token, redirecting to /.")
    /* Clear state */
    return({ type: 'LOGOUT', payload: null })
}


