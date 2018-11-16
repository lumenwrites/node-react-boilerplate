import styled from 'styled-components'

export const Input = styled.input`
    background: ${props => props.theme.inputBackground};
    outline:  ${props => props.theme.border};
    border:none;
    padding: 15px 20px;
    margin-bottom: 8px;
    display: block;
    width: 100%;
    &::placeholder {
    color:  ${props => props.theme.placeholderTextColor};
    }
`
