import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spring, Transition } from 'react-spring'
import styled from 'styled-components'

import { setNotification } from '../../actions/utils'

const NotificationStyled = styled.div`
    position: fixed;
    top:0;left:0;
    width: 100%;
    padding: 5px;
    text-align:center;
    background: ${props => props.theme.background2};
    color: ${props => props.theme.textColor};
`


class Notificaton extends Component {
    componentDidUpdate() {
	const { notification } = this.props.utils
	if (notification) {
	    /* Hide notification after 1 second */
	    setTimeout(() => {
		this.props.setNotification("")
	    }, 1000);
	}
    }
    render() {
	const { notification } = this.props.utils
	const show = notification ? true : false
	return (
	    <Transition
		items={show}
		from={{ opacity: 1 }}
		enter={{ opacity: 1 }}
		leave={{ opacity: 0 }}>
		{show => show && (styles=> <NotificationStyled style={styles}>
		    { notification }
		</NotificationStyled>)}
	    </Transition>
	    
	)
    }
}

export default connect(({ utils }) => ({ utils }), { setNotification })(Notificaton)
