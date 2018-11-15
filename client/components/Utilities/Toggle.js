import { Component } from 'react';

class Toggle extends Component {
    state = {
	on: this.props.on
    }

    toggle = () => {
	console.log('toggle')
	this.setState({
	    on: !this.state.on
	})
    }

    render() {
	const {children} = this.props
	/* Pass children whatever I want */
	return children({
	    on:this.state.on,
	    toggle: this.toggle
	})
    }
}

export default Toggle
