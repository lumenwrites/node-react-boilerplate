import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import queryString from 'query-string'

/* Actions */
import { fetchProfile } from '../actions/profiles'
import { setNotification, toggleModal } from '../actions/utils'

/* Modals */
import LoginModal from './Profiles/LoginModal'
import ForgotPasswordModal from './Profiles/ForgotPasswordModal'
import ResetPasswordModal from './Profiles/ResetPasswordModal'
import SettingsModal from './Profiles/SettingsModal'
import Upgrade from './Profiles/Upgrade'
/* Styles */
import { GlobalStyle } from './Styled'
/* Elements */
import { Notification } from './Elements'
/* Components */
import Landing from './Landing'
import Main from './Main'

const theme = {
    textColor: '#582323',
    placeholderTextColor: '#848faa',
    buttonBackground: '#f66303',
    buttonColor: 'white',
    inputBackground: 'white',
    border: '1px solid rgba(98,24,24,0.2)',
    linkColor: '#008cba',
    modalBackground: '#fff7e9',
    panelBackground: '#fffaf1',
    background1: '#f6e4cd',
    background2: '#fff7e9',
    background3: '#fffaf1'
}

const AppStyled = styled.div`
    background: ${props => props.theme.background1};    
    height: 100%;
`


class App extends Component {
    componentDidMount(){
	if (window.location.pathname == '/login/') {
	    console.log("[App] Mounted after oAuth.")
	    const { token } = queryString.parse(location.search)
	    console.log('[Main] Saving token to local storage, redirecting to /')
	    localStorage.setItem('token', token)
	    window.history.replaceState(null, null, '/')
	    this.props.setNotification('Login successful!')
	}
	if (window.location.pathname === '/reset-password') {
	    this.props.toggleModal('reset-password')
	}
	
	if (localStorage.getItem('token')) {
	    console.log("[App] Fetch profile")
	    this.props.fetchProfile()
	}
    }

    renderMain() {
	/* If logged in, render the app, but only after profile is fetched */
	if (!this.props.profile.email) return null
	return (
	    <>
		<Main/>
		<SettingsModal/>
		<Upgrade/>
	    </>
	)
    }

    renderLanding() {
	return (
	    <>
		<Landing/>
		<LoginModal/>
		<ForgotPasswordModal/>
		<ResetPasswordModal/>
	    </>
	) 
    }

    render() {
	const { profile } = this.props
	console.log('Render App', this.props.profile.email)
	return (
	    <ThemeProvider theme={theme}>
		<AppStyled>
		    { localStorage.getItem('token') ?
		      this.renderMain() : this.renderLanding() }
		    <Notification/>
		    <GlobalStyle />
		</AppStyled>
	    </ThemeProvider>
	)
    }
}


export default connect(({ profile }) => ({ profile }),
		       { fetchProfile, setNotification, toggleModal })(App)
