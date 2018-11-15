import axios from 'axios'

export const fetchProfile = () => async dispatch => {
    const config = { headers:  { authorization: localStorage.getItem('token')} }
    const res = await axios.get('/api/v1/profiles/profile', config)
    const profile = res.data
    dispatch({ type: 'FETCH_PROFILE', payload: profile });
}
