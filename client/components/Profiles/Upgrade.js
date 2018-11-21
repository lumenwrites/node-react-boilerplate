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
		<StripeCheckout
		    token={this.props.upgrade}
		    name="Upgrade"
		    stripeKey="pk_test_WPQ0ocKjrUp0IZS0AFoewhkB"
		    amount={1000}
		    currency="USD"
		    email={this.props.profile.email}
		    allowRememberMe={false}
		/>
	    </Modal>
	)
    }
}

export default connect(({ profile }) => ({ profile }), { upgrade })(Upgrade)
