import React, { Component } from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'

/* Actions */
import { upgrade } from '../../actions/profiles'

/* Elements */
import { Modal, Button, Error } from '../Elements'


class Upgrade extends Component {
    state = { waiting: false }

    upgrade = token => {
	this.setState({waiting:true})
	console.log('flip state')
	/* Run upgrade action */
	this.props.upgrade(token)
    }


    render() {
	return (
	    <Modal name="upgrade">
		<h2> Upgrade your account </h2>
		{ this.props.error ?
		<Error error={this.props.error} />
		:
		<StripeCheckout
		    token={this.upgrade}
		    name="Upgrade"
		    stripeKey={process.env.STRIPE_PUBLIC}
		    amount={1000}
		    currency="USD"
		    email={this.props.profile.email}
		    allowRememberMe={false}>
		    { this.state.waiting ?
		      <p>Waiting for a response...</p>
		      : <Button fullwidth large> Upgrade ($10/mo) </Button>}
		</StripeCheckout>}
	    </Modal>
	)
    }
}

export default connect(({ profile, utils: { error } }) => ({ profile, error }),
		       { upgrade })(Upgrade)
