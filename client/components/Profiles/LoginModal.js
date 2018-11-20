import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import Cookies from 'js-cookie'
import queryString from 'query-string'

/* Actions */
import { login, signup } from '../../actions/profiles'
import { toggleModal } from '../../actions/utils'

/* Elements */
import { Modal, Button, Input, Error } from '../Elements'

class LoginModal extends Component {
    state = { error: "" }

    signup = ()=> {
	const credentials = {
	    email: this.signupEmail.value,
	    password: this.signupPassword.value,
	    source: Cookies.get('source')
	}
	if (!this.state.error) this.props.signup(credentials)
    }

    login = () => {
	const credentials = {
	    email: this.loginEmail.value,
	    password: this.loginPassword.value,
	    source: Cookies.get('source')	    
	}
	if (!this.state.error) this.props.login(credentials)
    }

    oAuth = () => {
	var redirectUrl = "/api/v1/profiles/google"

	var userMeta = {
	    source: Cookies.get('source')	    
	}
	userMeta = queryString.stringify(userMeta)
	if (userMeta.length) { userMeta = "?" + userMeta }

	/* Redirect to server url, it will initiate passport oAuth process */
	window.location.href = redirectUrl + userMeta
    }

    validateEmail = ()=> {
	if (this.signupEmail && isEmail(this.signupEmail.value)) {
	    this.setState({error:""})	    
	} else {
	    this.setState({error:"Please enter a valid email"})
	}
    }

    validatePassword = ()=> {
	if (this.signupPassword && this.signupPassword.value.length > 5) {
	    this.setState({error:""})	    
	} else {
	    this.setState({error:"Password should be at least 5 characters long."})
	}
    }    

    render() {
	return (
	    <Modal name="login">
		<Error error={this.state.error || this.props.error} />
		<h2>Join</h2>
		<Input ref={ref => this.signupEmail = ref}
		       placeholder="Your email..."
		       type="email"
		       name="email"
		       onBlur={this.validateEmail}
		       autoComplete="true" />
		<Input ref={ref => this.signupPassword = ref}
		       placeholder="Your password (5+ characters)..."
		       type="password"
		       name="password"
		       onBlur={this.validatePassword}
		       autoComplete="true" />
		<Button fullwidth onClick={this.signup}>Join</Button>
		<hr/>
		<h2>Login</h2>
		<Input ref={ref => this.loginEmail = ref}
		       placeholder="Your email..."
		       type="email"
		       name="email"
		       autoComplete="true" />
		<Input ref={ref => this.loginPassword = ref}
		       placeholder="Your password..."
		       type="password"
		       name="password"
		       autoComplete="true" />
		<Button fullwidth onClick={this.login}>Login</Button>
		<a className="small-text right dim no-decoration"
		    onClick={() => this.props.toggleModal('request-reset')}>
		    Forgot password?
		</a>
		<div className="clearfix"/>
		<hr/>
		<Button fullwidth large
			onClick={this.oAuth.bind(this)}>Signup/Login with Google</Button>
	    </Modal>
	)
    }
}

export default connect(({utils: { error }})=>({error}),
		       {login, signup, toggleModal})(LoginModal)
