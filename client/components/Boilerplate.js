/* Connect to redux */
import React, { Component } from 'react-redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
export default connect(({ profile }) => ({ profile }), {})(App)

import { toggleModal } from '../../actions/utils'

const Element = styled.div`
    background: ${props => props.theme.background2};
    ${props => props.fullwidth && 'width:100%;'}
`


import { BrowserRouter as Router } from 'react-router-dom'
<Router>
<Route exact path="/" component={Landing}/>
<Route exact path="/" component={Landing}/>
</Router>
