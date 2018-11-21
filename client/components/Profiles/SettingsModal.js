import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import Cookies from 'js-cookie'
import queryString from 'query-string'

/* Actions */
import { updateProfile } from '../../actions/profiles'
import { toggleModal } from '../../actions/utils'

/* Elements */
import { Modal, Button, Input, Error } from '../Elements'

class ForgotPasswordModal extends Component {
    state = {
	error: "",
	email: this.props.profile.email
    }

    
    onChange = e => {
	/* Universal way to update state for every field */
	const { name, value } = e.target
	this.setState({[name]: value})
    }

    saveSettings = ()=> {
	const { email } = this.state
	const { profile } = this.props
	profile.email = email
	profile.prefs = {...profile.prefs}
	this.props.updateProfile(profile)
	this.props.toggleModal(false)
    }

    validateEmail = ()=> {
	if (isEmail(this.state.email)) {
	    this.setState({error:""})	    
	} else {
	    this.setState({error:"Please enter a valid email"})
	}
    }

    render() {
	return (
	    <Modal name="settings">
		<Error error={this.state.error || this.props.error} />
		<h2>Settings</h2>
		<Input placeholder="Your email..."
		       type="email"
		       name="email"
		       value={this.state.email}
		       onChange={this.onChange} 
		       onBlur={this.validateEmail}
		       autoComplete="true" />
		<Button onClick={this.saveSettings}>
		    Save
		</Button>
	    </Modal>
	)
    }
}

export default connect(({utils: { error }, profile})=>({error, profile}),
		       { updateProfile, toggleModal })(ForgotPasswordModal)
