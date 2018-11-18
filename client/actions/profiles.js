import axios from 'axios'

const { API_URL } = process.env

/* Fetch profile */
export const fetchProfile = () => async dispatch => {
    try {
	const config = { headers:  { authorization:localStorage.getItem('token')} }
	const res = await axios.get(`${API_URL}/profiles/profile`, config)
	const profile = res.data
	dispatch({ type: 'FETCH_PROFILE', payload: profile })
    } catch({response: {data}}) {
	console.log("[profiles actions] fetch profile error:", data)
	dispatch({ type: 'ERROR', payload: data })
    }     
}

/* Update profile */
export const updateProfile = (profile) => async dispatch => {
    const config = { headers:  { authorization: localStorage.getItem('token')} }
    const res = await axios.post(`${API_URL}/profiles/profile`, profile, config)
    const updatedProfile = res.data
    /* console.log('Updated profile on server, received it back', updatedProfile) */
    dispatch({ type: 'UPDATE_PROFILE', payload: updatedProfile })
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
    } catch({response: {data}}) {
	console.log("[profiles actions] signup error:", data)
	dispatch({ type: 'ERROR', payload: data })
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
	/* dispatch({ type: 'NOTIFICATION', payload: "Login successful!" }) */
    } catch({response: {data}}) {
	console.log("[profiles actions] login error:", data)
	dispatch({ type: 'ERROR', payload: data })
    }
}

/* Logout */
export const logout = (history) => {
    localStorage.removeItem('token')
    /* history.push('/') */
    console.log("[profiles actions] Logged out. Deleted token, redirecting to /.")
    return({ type: 'LOGOUT', payload: null }) // Clear profile state
}


