import styled from 'styled-components'

export const Button = styled.button`
    background: ${props => props.theme.buttonBackground};
    color: ${props => props.theme.buttonColor};
    ${props => props.fullwidth && 'width:100%;'}
    border: none;
    padding: 15px 20px;
    ${props => props.large && 'padding:20px;'}
    cursor: pointer;
`
