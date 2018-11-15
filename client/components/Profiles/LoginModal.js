import React, { Component } from 'react'

/* Elements */
import { Toggle } from '../Utilities'
import { Modal, Button, Input } from '../Elements'

class LoginModal extends Component {
    render() {
	return (
	    <Toggle on>
		{({on, toggle})=> (
		    <>
			<Button onClick={toggle}>Login</Button>
			<Modal on={on} toggle={toggle}>
			    <h2>Join</h2>
			    <Input placeholder="Your email..." />
			    <Input placeholder="Your password..." />
			    <Button fullwidth>Join</Button>
			    <hr/>
			    <h2>Login</h2>
			    <Input placeholder="Your email..." />
			    <Input placeholder="Your password..." />
			    <Button fullwidth>Login</Button>
			    <a href="/" className="small-text right dim no-decoration">
				Forgot password?
			    </a>
			    <div className="clearfix"/>
			    <hr/>
			    <Button fullwidth large>Signup/Login with Google</Button>
			</Modal>
		    </>
		)}
	    </Toggle>
	)
    }
}

export default LoginModal
