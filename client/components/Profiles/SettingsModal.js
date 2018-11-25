import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import Cookies from 'js-cookie'
import queryString from 'query-string'
import StripeCheckout from 'react-stripe-checkout'

/* Actions */
import { updateProfile,
	 updatePaymentInfo,
	 cancelSubscription } from '../../actions/profiles'
import { toggleModal } from '../../actions/utils'
import { capitalize } from '../../utils'

/* Elements */
import { Modal, Button, Input, Error, Selector } from '../Elements'

class SettingsModal extends Component {
    state = {
	error: "",
	theme: this.props.profile.prefs.theme,
	email: this.props.profile.email
    }

    
    onChange = e => {
	/* Universal way to update state for every field */
	const { name, value } = e.target
	this.setState({[name]: value})
    }

    saveSettings = ()=> {
	const { email, theme } = this.state
	const { profile } = this.props
	profile.email = email
	profile.prefs = {...profile.prefs, theme}
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
	const { sourceBrand, sourceLast4, plan, prefs } = this.props.profile
	return (
	    <>
		<Modal name="settings">
		    <Error error={this.state.error || this.props.error} />
		    <h2>Account Settings</h2>
		    <Input placeholder="Your email..."
			   type="email"
			   name="email"
			   value={this.state.email}
			   onChange={this.onChange} 
			   onBlur={this.validateEmail}
			   autoComplete="true" />
		    <label>Theme:</label>
		    <Selector>
			<div className="handle">
			    {capitalize(this.state.theme || 'light')}
			</div>
			<div className="item"
			     onClick={()=> this.setState({theme:'light'})}>
			    Light
			</div>
			<div className="item"
			     onClick={()=> this.setState({theme:'dark'})}>
			    Dark
			</div>
		    </Selector>
		    <Button className="right" onClick={this.saveSettings}>
			Save
		    </Button>
		    <div className="clearfix"/>
		    {/* <Button>Delete Account</Button> */}

		    { plan === 'premium' ?
		      <>
			  <hr/>
			  <h2> Subscription </h2>
			  <p>Payment method: { sourceBrand } ending in { sourceLast4 }</p>
			  <Button onClick={()=>
			      this.props.toggleModal('confirm-cancel-subscription')}>
			      Cancel subscription
			  </Button>
			  <StripeCheckout
			      token={this.props.updatePaymentInfo}
			      name="Update Payment Info"
			      panelLabel="Update Card"
			      stripeKey={process.env.STRIPE_PUBLIC}
			      email={this.props.profile.email}
			      allowRememberMe={false}>
			      <Button className="right"> Update Card </Button>
			  </StripeCheckout>
		      </>
		      : null}
		</Modal>
		<Modal name="confirm-cancel-subscription">
		    <h2> Are you sure? </h2>
		    <Button onClick={()=> this.props.toggleModal('settings')}>
			Cancel
		    </Button>
		    <Button className="right" onClick={this.props.cancelSubscription}>
			Confirm
		    </Button>
		</Modal>
	    </>
	)
    }
}

export default connect(({utils: { error }, profile})=>({error, profile}),
		       { updateProfile,
			 updatePaymentInfo,
			 cancelSubscription,
			 toggleModal })(SettingsModal)
