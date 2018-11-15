import React, { Component } from 'react'
import { connect } from 'react-redux'

/* Styles */
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './Styled'

/* Elements */
import LoginModal from './Profiles/LoginModal'

const theme = {
    buttonBackground: '#f66303',
    buttonColor: 'white',
    inputBackground: 'white',
    border: '1px solid rgba(98,24,24,0.2)',
    linkColor: '#008cba'
}

const AppStyled = styled.div`
    background: #f2f2f2;
    padding: 15px;
    height: 100%;
`



class App extends Component {
    render() {
	const { profile } = this.props
	return (
	    <ThemeProvider theme={theme}>
	    <AppStyled>
		App
		<LoginModal/>
		<GlobalStyle />
	    </AppStyled>
	    </ThemeProvider>
	)
    }
}

const mapStateToProps = ({ profile }) => ({
    profile
})

export default connect(mapStateToProps, {
})(App)
