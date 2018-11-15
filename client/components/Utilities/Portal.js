import { Component } from 'react'
import ReactDOM from 'react-dom'

const portalRoot = document.getElementById('portal')

class Portal extends Component {
    constructor() {
	super()
	/* create element */
	this.el = document.createElement('div')
    }

    componentDidMount(){
	/* append it to portal (div outside of my root react app) */
	portalRoot.appendChild(this.el)
    }

    componentWillUnmount(){
	/* append it to portal (div outside of my root react app) */
	portalRoot.removeChild(this.el)
    }
    
    render() {
	const { children } = this.props
	return ReactDOM.createPortal(children, this.el)
    }
}

export default Portal;
