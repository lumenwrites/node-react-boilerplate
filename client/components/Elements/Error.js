import React from 'react'
import styled from 'styled-components'

const ErrorStyled = styled.div`
    border: ${props => props.theme.border};
    background:  ${props => props.theme.panelBackground};
    padding: 8px;
`

const Error = ({ error }) => {
    if (!error) return null
    return (
	<ErrorStyled>
	    { error }
	</ErrorStyled>
    )
}

export default Error
