import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'

/* Actions */
import { fetchProfile } from '../actions/profiles'

/* Modals */
import LoginModal from './Profiles/LoginModal'
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
	if (localStorage.getItem('token')) {
	    console.log("[App] Fetch profile")
	    this.props.fetchProfile()
	}
    }
    render() {
	const { profile } = this.props
	return (
	    <ThemeProvider theme={theme}>
		<AppStyled>
		    { localStorage.getItem('token') ? <Main/> : <Landing/> }
		    <LoginModal/>
		    <Notification/>
		    <GlobalStyle />
		</AppStyled>
	    </ThemeProvider>
	)
    }
}


export default connect(({ profile }) => ({ profile }), { fetchProfile })(App)
