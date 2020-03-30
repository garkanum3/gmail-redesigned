import React from 'react'
import logo from '../static/images/gmail_logo.png'

const Navbar = () => {
	return (
		<nav className="navbar navbar-dark fixed-top flex-md-nowrap p-0">
			<a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
				<img
					src={logo}
					height="30"
					className="d-inline-block align-top"
					alt="React Bootstrap logo"
				/>
			</a>
		</nav>
	)
}

export default Navbar
