import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import Cookies from 'js-cookie'
import queryString from 'query-string'

/* Actions */
import { requestReset } from '../../actions/profiles'

/* Elements */
import { Modal, Button, Input, Error } from '../Elements'

class ForgotPasswordModal extends Component {
    state = { error: "" }

    submit = ()=> {
	const credentials = {
	    email: this.email.value,
	}
	if (!this.state.error) this.props.requestReset(credentials)
    }

    validateEmail = ()=> {
	if (this.email && isEmail(this.email.value)) {
	    this.setState({error:""})	    
	} else {
	    this.setState({error:"Please enter a valid email"})
	}
    }

    render() {
	return (
	    <>
		<Modal name="request-reset">
		    <Error error={this.state.error || this.props.error} />
		    <h2>Request password reset</h2>
		    <Input ref={ref => this.email = ref}
			   placeholder="Enter your email..."
			   type="email"
			   name="email"
			   onBlur={this.validateEmail}
			   autoComplete="true" />
		    <Button fullwidth onClick={this.submit}>Request password reset</Button>
		    <p className="small-text dim">You will receive an email with a link that allows you to reset your password.</p>
		</Modal>
		<Modal name="reset-requested">
		    Success! Check your email!
		</Modal>
	    </>
	)
    }
}

export default connect(({utils: { error }})=>({error}),
		       { requestReset })(ForgotPasswordModal)
