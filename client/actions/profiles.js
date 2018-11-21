import axios from 'axios'

const { API_URL } = process.env

/* Fetch profile */
export const fetchProfile = () => async dispatch => {
    try {
	const config = { headers:  { authorization:localStorage.getItem('token')} }
	const res = await axios.get(`${API_URL}/profiles/profile`, config)
	const profile = res.data
	dispatch({ type: 'FETCH_PROFILE', payload: profile })
    } catch(err) {
	if (!err.response) return console.log(err)
	console.log("[profiles actions] fetch profile error:", err.response.data)
	dispatch({ type: 'ERROR', payload: err.response.data })
    }     
}

/* Update profile */
export const updateProfile = (profile) => async dispatch => {
    try {
	const config = { headers:  { authorization: localStorage.getItem('token')} }
	const res = await axios.post(`${API_URL}/profiles/profile`, profile, config)
	const updatedProfile = res.data
	/* console.log('Updated profile on server, received it back', updatedProfile) */
	dispatch({ type: 'UPDATE_PROFILE', payload: updatedProfile })
    } catch(err) {
	if (!err.response) return console.log(err)
	console.log("[profiles actions] update profile error:", err.response.data)
	dispatch({ type: 'ERROR', payload: err.response.data })
    } 

}


/* Auth */
/* Email/Password Signup */
export const signup = (credentials) => async dispatch => {
    /* Send email/password, receive profile and jwt back */
    try {
	const res = await axios.post(`${API_URL}/profiles/password/signup`, credentials)
	localStorage.setItem('token', res.data.token) // Save token
	dispatch({ type: 'FETCH_PROFILE', payload: res.data }) // Send profile to redux
	dispatch({ type: 'NOTIFICATION', payload: "Signup successful!" })
    } catch(err) {
	if (!err.response) return console.log(err)
	console.log("[profiles actions] signup error:", err.response.data)
	dispatch({ type: 'ERROR', payload: err.response.data })
    }

}

/* Email/Password Login */
export const login = (credentials) => async dispatch => {
    /* Send email/password, receive profile and jwt back */
    try {
	const res = await axios.post(`${API_URL}/profiles/password/login`, credentials)
	console.log(API_URL, res.data)
	localStorage.setItem('token', res.data.token) // Save token
	dispatch({ type: 'FETCH_PROFILE', payload: res.data }) // Send profile to redux
	dispatch({ type: 'NOTIFICATION', payload: "Login successful!" })
    } catch(err) {
	if (!err.response) return console.log(err)
	console.log("[profiles actions] login error:", err.response.data)
	dispatch({ type: 'ERROR', payload: err.response.data })
    }
}

/* Reset password */
export const requestReset = (credentials) => async dispatch => {
    /* Send email, generate resetToken, email it to user */
    try {
	const res = await axios.post(`${API_URL}/profiles/request-reset`, credentials)
	console.log(res.data)
	dispatch({ type: 'TOGGLE_MODAL', payload: 'reset-requested' })
    } catch(err) {
	if (!err.response) return console.log(err)
	console.log("[profiles actions] request reset error:", err.response.data)
	dispatch({ type: 'ERROR', payload: err.response.data })
    }
}

export const resetPassword = (credentials) => async dispatch => {
    /* Send new password and resetToken, get back updated profile with new JWT, login */
    try {
	const res = await axios.post(`${API_URL}/profiles/reset-password`, credentials)
	console.log('received token', res.data.token)
	localStorage.setItem('token', res.data.token) // Save JWT token
	window.history.replaceState(null, null, '/') // redirect from token?=123  to /
	dispatch({ type: 'FETCH_PROFILE', payload: res.data }) // Send profile to redux
	dispatch({ type: 'TOGGLE_MODAL', payload: null })
    } catch(err) {
	if (!err.response) return console.log(err)
	console.log("[profiles actions] reset password error:", err.response.data)
	dispatch({ type: 'ERROR', payload: err.response.data })
    } 
}


/* Logout */
export const logout = (history) => {
    localStorage.removeItem('token')
    /* history.push('/') */
    console.log("[profiles actions] Logged out. Deleted token, redirecting to /.")
    return({ type: 'LOGOUT', payload: null }) // Clear profile state
}



/* Stripe Payments */
export const upgrade = (token) => async dispatch => {
    try {
	const config = { headers:  { authorization:localStorage.getItem('token')} }
	const res = await axios.post(`${API_URL}/profiles/upgrade`, { token }, config)
	const profile = res.data
	console.log(`We are in business, ${profile.email}!`)
	/* dispatch({ type: 'FETCH_PROFILE', payload: profile }) */
    } catch(err) {
	if (!err.response) return console.log(err)
	console.log("[profiles actions] upgrade profile error:", err.response.data)
	dispatch({ type: 'ERROR', payload: err.response.data })
    }     
}
