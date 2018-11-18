import React, { Component } from 'react'
import styled from 'styled-components'

import Header from './Header'

const Wrapper = styled.div`
    max-width: 80%;
    margin: auto;
`

const Body = styled.div`
    background: ${props => props.theme.background3};
    padding: 8px;
`


class Main extends Component {
    render() {
	return (
	    <Wrapper>
		<Header/>
		<Body>Body</Body>
	    </Wrapper>
	)
    }
}

export default Main
