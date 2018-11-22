import React, { Component } from 'react'
import { connect } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'

/* Actions */
import { upgrade } from '../../actions/profiles'

/* Elements */
import { Modal, Button, Error } from '../Elements'


class Upgrade extends Component {
    render() {
	return (
	    <Modal name="upgrade">
		<h2> Upgrade your account </h2>
		
		<StripeCheckout
		token={this.props.upgrade}
		name="Upgrade"
		stripeKey={process.env.STRIPE_PUBLIC}
		amount={1000}
		currency="USD"
		email={this.props.profile.email}
		allowRememberMe={false}>
		    <Button fullwidth large> Upgrade ($10/mo) </Button>
		</StripeCheckout>
	    </Modal>
	)
    }
}

export default connect(({ profile }) => ({ profile }), { upgrade })(Upgrade)
