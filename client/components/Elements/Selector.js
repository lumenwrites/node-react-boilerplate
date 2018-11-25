import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Selector = props => (
    <Dropdown>
	{props.children[0]}
	<FontAwesomeIcon icon={["fas", "caret-down"]}/>
	<div className="dropdown-menu">
	    {props.children.slice(1)}
	</div>
    </Dropdown>
)

export default Selector

const Dropdown = styled.div`
    position: relative;
    color: ${props => props.theme.textColor};
    .handle {
    cursor: pointer;
    border: ${props => props.theme.border};
    background: ${props => props.theme.selectorBackground};
    padding: 8px;
    }
    svg {
    position: absolute;
    top: calc(50% - 8px);
    right: 8px;
    }

    &:hover .dropdown-menu {
    display: block;
    }
    .dropdown-menu {
    display: none;
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    z-index: 1000;
    background:white;
    background: ${props => props.theme.dropdownBackground};
    box-shadow: 0 2px 4px rgba(0,0,0,.175);
    border: ${props => props.theme.border};
    .item {
    padding: 8px;
    border-bottom: ${props => props.theme.theme === 'dark' && '1px solid rgba(0,0,0,0.15)'};
    display:block;
    cursor:pointer;
    text-decoration:none;    
    &.active {
    color: white;
    }
    &:hover {
    background:  ${props => props.theme.dropdownHover};
    }
    svg {
    margin-right: 8px;
    }
    }		
    }
`
