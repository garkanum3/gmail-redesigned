import React, { useState, useEffect } from 'react'

import Navbar from './layout/Navbar'
import Sidebar from './layout/Sidebar'
import Content from './layout/Content'

import './static/css/bootstrap.min.css'
import './static/css/styles.css'

import emailsData from './static/assets/emails.json'
import additionalEmailsData from './static/assets/additionalEmails.json'

function App() {
	// Initialize Email tags
	const [tagsList] = useState([
		{
			name: 'inbox',
			color: '#D44638',
		},
		{
			name: 'work',
			color: '#9B59B6',
		},
		{
			name: 'travel',
			color: '#1ABC9C',
		},
		{
			name: 'promotion',
			color: '#D35400',
		},
		{
			name: 'social',
			color: '#F1C40F',
		},
	])
	const [tag, setTag] = useState('inbox')

	// Initialize Emails
	const [allEmails, setAllEmails] = useState(null)
	useEffect(() => {
		let tempEmails = emailsData.messages.concat(additionalEmailsData.messages) // Combine given emails.json and additional data

		// Sort emails by date, newest first
		tempEmails.sort((a, b) => {
			return new Date(b.date) - new Date(a.date)
		})

		tempEmails.forEach((email) => {
			email.read = false
		})
		setAllEmails(tempEmails)
	}, [])

	return (
		<>
			<Navbar />
			<div className="container-fluid">
				<div className="row">
					<Sidebar
						tag={tag}
						setTag={(newTag) => setTag(newTag)}
						tagsList={tagsList}
					/>

					<Content allEmails={allEmails} tag={tag} tagsList={tagsList} />
				</div>
			</div>
		</>
	)
}

export default App
