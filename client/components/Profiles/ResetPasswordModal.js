import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import Cookies from 'js-cookie'
import queryString from 'query-string'

/* Actions */
import { resetPassword } from '../../actions/profiles'

/* Elements */
import { Modal, Button, Input, Error } from '../Elements'

class ResetPasswordModal extends Component {
    state = { error: "" }

    submit = ()=> {
	const { token } = queryString.parse(location.search)
	const credentials = {
	    password: this.password.value,
	    token
	}
	if (!this.state.error) this.props.resetPassword(credentials)
    }

    validatePassword = ()=> {
	if (this.password && this.password.value.length > 5) {
	    this.setState({error:""})	    
	} else {
	    this.setState({error:"Password should be at least 5 characters long."})
	}
    }    

    render() {
	return (
	    <Modal name="reset-password">
		<Error error={this.state.error || this.props.error} />
		<h2>Enter your new password</h2>
		<Input ref={ref => this.password = ref}
		       placeholder="Enter your email..."
		       type="password"
		       name="password"
		       onBlur={this.validatePassword} />
		<Button fullwidth onClick={this.submit}>Reset password</Button>
	    </Modal>
	)
    }
}

export default connect(({utils: { error }})=>({error}),
		       { resetPassword })(ResetPasswordModal)
