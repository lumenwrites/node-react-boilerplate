/* Connect to redux */
import React, { Component } from 'react-redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
export default connect(({ profile }) => ({ profile }), {})(App)

/* Actions */
import { fetchProfile } from '../actions/profiles'
import { toggleModal } from '../../actions/utils'

const Element = styled.div`
    background: ${props => props.theme.background2};
    ${props => props.fullwidth && 'width:100%;'}
`



