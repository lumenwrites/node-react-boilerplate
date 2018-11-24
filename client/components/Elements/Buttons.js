import styled from 'styled-components'

export const Button = styled.button`
    background: ${props => props.theme.buttonBackground};
    color: ${props => props.theme.buttonColor};
    ${props => props.fullwidth && 'width:100%;'}
    border: ${props => props.theme.theme === 'dark' && '1px solid #e3335c'};
    padding: 15px 20px;
    ${props => props.large && 'padding:20px;'}
    cursor: pointer;
`
