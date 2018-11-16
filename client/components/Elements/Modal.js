import React, { Component } from 'react'

import styled from 'styled-components'

import { Portal } from '../Utilities'
import Icon from './Icon'

class Modal extends Component {
    render() {
	const { children, toggle, on } = this.props
	return (
	    <Portal>
		{on &&
		 <ModalWrapper>
		     <ModalCard>
			 {/*  
			     <CloseButton onClick={toggle}>
			     <Icon name="close"/>
			     </CloseButton>
			   */}
			 <div>{children}</div>
		     </ModalCard>
		     <Background  onClick={toggle}/>
		 </ModalWrapper>
		}
	    </Portal>
	)
    }
}

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Background = styled.div`
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
`

const ModalCard = styled.div`
    background:  ${props => props.theme.modalBackground};
    border-radius: 2px;
    padding: 16px 32px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
    position: relative;
    min-width: 320px;
    width: 40%;
    z-index:10;
    position: absolute;
    top: 16px;
    
    h1, h2 {
      text-align:center;
    }
`

const CloseButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    border:none;
    background: none;
    padding: 10px;
`

export default Modal
