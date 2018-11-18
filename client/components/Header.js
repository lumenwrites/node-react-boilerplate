import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

/* Elements */
import Menu from './Menu'

const HeaderStyled = styled.div`
    background: ${props => props.theme.background2};
    border-bottom: ${props => props.theme.border};
    padding: 8px;
`

class Header extends Component {
    render() {
	return (
	    <HeaderStyled>
		<Menu/>
		<div className="right">{ this.props.profile.email }</div>
		<div className="clearfix"/>
	    </HeaderStyled>
	)
    }
}

export default connect(({ profile }) => ({ profile }), {})(Header)
