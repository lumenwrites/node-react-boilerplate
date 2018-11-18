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
	    <LandingStyles>
		<div className="cta">
		    <img src="/img/laptop-1.png"/>
		    <h1>Write every day, <br/> skyrocket your productivity</h1>
		    <p>You're looking at a very simple but powerful tool
			that will help you to:</p>
		    <ul>
			<li>Develop a daily writing habit.</li>
			<li>Massively increase your writing output.</li>
			<li>Master the art of writing in a fun and engaging way!</li>
		    </ul>
		    <Button onClick={() => this.props.toggleModal("login") }>
			Try it now! <br/>
			(Signup/Login)
		    </Button>
		</div>
	    </LandingStyles>
	)
    }
}

const LandingStyles = styled.div`
    background: ${props => props.theme.background2};
    h1 {
    border: none;
    }
    .cta {
    padding: 80px;
    img {
    width: 50%;
    float:right;
    filter: drop-shadow(8px 5px 8px rgba(0,0,0,0.5));
    }
    button {
    padding: 20px 40px;
    }
    }
`

export default connect(null,  { toggleModal })(Landing)
