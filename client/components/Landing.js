import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

/* Actions */
import { toggleModal } from '../actions/utils'

/* Elements */
import { Button } from './Elements'

class Landing extends Component {
    render() {
	return (
	    <div>
		Landing
		<Button onClick={() => this.props.toggleModal("login") }>
		    <FontAwesomeIcon icon={["fas", "sign-in-alt"]}/>
		    Signup/Login
		</Button>
	    </div>
	)
    }
}

export default connect(null,  { toggleModal })(Landing)
