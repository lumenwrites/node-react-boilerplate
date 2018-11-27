import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import queryString from 'query-string'

/* Google analytics */
import ReactGA from 'react-ga'
ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_CODE)

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
import Head from './Head'

const theme = {
    theme: 'light',
    textColor: '#582323',
    placeholderTextColor: '#848faa',
    buttonBackground: '#f66303',
    buttonColor: 'white',
    inputBackground: 'white',
    selectorBackground: '#fffaf1',
    border: '1px solid rgba(98,24,24,0.2)',
    linkColor: '#008cba',
    modalBackground: '#fff7e9',
    panelBackground: '#fffaf1',
    dropdownBackground: 'white',
    background1: '#f6e4cd',
    background2: '#fff7e9',
    background3: '#fffaf1'
}

const themeDark = {
    theme: 'dark',
    textColor: '#9baec8',
    placeholderTextColor: 'rgba(112, 126, 148, 0.57)',
    buttonBackground: '#363b51',
    selectorBackground: '#272b37', // bright #363b51
    buttonColor: '#848faa',
    inputBackground: '#1f222d',
    border: '1px solid rgba(156,175,201,0.31)',
    linkColor: '#008cba',
    modalBackground: '#363c4a',
    panelBackground: '#3b4151',
    dropdownBackground: '#313543',
    dropdownHover: '#3f465a',
    background1: '#1f222d',
    background2: '#272b37',
    background3: '#2e3241'
}

const AppStyled = styled.div`
    background: ${props => props.theme.background1};    
    height: 100%;
`

class App extends Component {
    componentDidMount(){
	/* ReactGA.pageview(window.location.pathname + window.location.search) */
	ReactGA.pageview('/google-analytics-test')
	ReactGA.event({
	    category: 'User',
	    action: 'Created account'
	})
	ReactGA.exception({
	    description: 'An error ocurred',
	    fatal: true
	})

	if (window.location.pathname == '/login/') {
	    /* Google OAuth. Save token, login, redirect.  */
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
	console.log('Render App')
	const darkTheme = profile.email && profile.prefs.theme==="dark"
	return (
	    <ThemeProvider theme={darkTheme ? themeDark : theme}>
	      <AppStyled>
		{ localStorage.getItem('token') ?
                  this.renderMain() : this.renderLanding() }
		<Notification/>
		<GlobalStyle />
                <Head />
              </AppStyled>
	    </ThemeProvider>
	)
    }
}


export default connect(({ profile }) => ({ profile }),
		       { fetchProfile, setNotification, toggleModal })(App)
