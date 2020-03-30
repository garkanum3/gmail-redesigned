import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleRight,
	faAngleLeft,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'

import ActionToolbar from '../components/ActionToolbar'

const EmailsTable = ({
	filteredEmails,
	setFilteredEmails,
	selectedEmails,
	setSelectedEmails,
	tagsList,
	setEmail,
}) => {
	const handleEmailView = (ind) => {
		let tempList = filteredEmails
		tempList[ind].read = true
		setFilteredEmails(tempList)
		setEmail(filteredEmails[ind])
	}

	return (
		<div className="table-responsive">
			<table className="table table-hover table-responsive-stack table-list">
				<tbody>
					{filteredEmails &&
						filteredEmails.map((email, i) => (
							<tr key={i} style={{ fontWeight: !email.read && 'bold' }}>
								{selectedEmails.indexOf(i) !== -1 ? (
									<td
										className="table-select"
										onClick={() => {
											let index = selectedEmails.indexOf(i)
											setSelectedEmails((selectedEmails) => [
												...selectedEmails.slice(0, index),
												...selectedEmails.slice(index + 1),
											])
										}}
									>
										<FontAwesomeIcon icon={faCheckSquare} />
									</td>
								) : (
									<td
										className="table-select"
										onClick={() =>
											setSelectedEmails((selectedEmails) => [
												...selectedEmails,
												i,
											])
										}
									>
										<FontAwesomeIcon icon={faSquare} />
									</td>
								)}
								<td className="table-sender" onClick={() => handleEmailView(i)}>
									{email.sender}
								</td>
								<td
									className="table-subject"
									onClick={() => handleEmailView(i)}
								>
									{email.subject}
								</td>
								<td className="table-tags" onClick={() => handleEmailView(i)}>
									{email.tags &&
										email.tags.map((t, i) => (
											<TagLabel key={i} tag={t} tagsList={tagsList} />
										))}
								</td>
								<td className="table-date" onClick={() => handleEmailView(i)}>
									{ParseDate(email.date)}
									<span className="table-angle-icon">
										<FontAwesomeIcon icon={faAngleRight} />
									</span>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

const TagLabel = ({ tag, tagsList }) => {
	let tagObj = tagsList.filter((t) => tag === t.name)[0]

	return (
		<span
			className="table-tag-label"
			style={{ border: '1px solid ' + tagObj.color, color: tagObj.color }}
		>
			{tagObj.name}
		</span>
	)
}

const ParseDate = (dateInput) => {
	const emailDate = new Date(dateInput)
	const currDate = new Date()

	const monthsList = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]

	const month = emailDate.getMonth()
	const day = emailDate.getDate()
	const year = emailDate.getFullYear()
	let hours = emailDate.getHours()
	const minutes = emailDate.getMinutes()
	const ampm = hours >= 12 ? 'pm' : 'am'
	hours = hours % 12
	hours = hours ? hours : 12
	const formattedTime = hours + ':' + minutes + ampm

	if (
		month === currDate.getMonth() &&
		day === currDate.getDate() &&
		year === currDate.getFullYear()
	) {
		return 'Today at ' + formattedTime
	} else {
		return monthsList[month] + ' ' + day + ' at ' + formattedTime
	}
}

const EmailsView = ({ email, clearEmail, tagsList }) => {
	return (
		<>
			<div className="table-responsive" style={{ paddingTop: '0.25em' }}>
				<table className="table table-email-view">
					<tbody>
						<tr>
							<td className="back" onClick={() => clearEmail()}>
								<FontAwesomeIcon
									icon={faAngleLeft}
									style={{ fontSize: '1.5em' }}
								/>
							</td>
							<td>
								<b>{email.subject}</b>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="container-email-view">
				<div className="row mb-3">
					<div className="col">
						<span className="align-middle">
							<FontAwesomeIcon
								icon={faUserCircle}
								style={{ fontSize: '2em' }}
							/>
						</span>
						<span className="align-middle" style={{ paddingLeft: '1em' }}>
							{email.sender}
						</span>
					</div>
					<div className="col text-right">
						<span className="align-middle">{ParseDate(email.date)}</span>
					</div>
				</div>
				<div className="row">
					<div
						className="col"
						dangerouslySetInnerHTML={{
							__html: email.body,
						}}
					/>
				</div>
				<div className="row">
					<div className="col">
						<b>Tags:</b>
						{email.tags &&
							email.tags.map((t, i) => (
								<TagLabel key={i} tag={t} tagsList={tagsList} />
							))}
					</div>
				</div>
			</div>
		</>
	)
}

const Content = ({ allEmails, tag, tagsList }) => {
	const [email, setEmail] = useState(null)
	const [selectedEmails, setSelectedEmails] = useState([])
	const [filteredEmails, setFilteredEmails] = useState(allEmails)

	useEffect(() => {
		if (tag === 'inbox') {
			setFilteredEmails(allEmails)
		} else {
			setFilteredEmails(
				allEmails && allEmails.filter((e) => e.tags.includes(tag)),
			)
		}
	}, [allEmails, tag])

	useEffect(() => {
		setSelectedEmails([])
	}, [tag, filteredEmails])

	return (
		<div className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
			<ActionToolbar
				tagsList={tagsList}
				filteredEmails={filteredEmails}
				setFilteredEmails={(newList) => setFilteredEmails(newList)}
				selectedEmails={selectedEmails}
				setSelectedEmails={(value) => setSelectedEmails(value)}
			/>

			{!email ? (
				<EmailsTable
					filteredEmails={filteredEmails}
					setFilteredEmails={(newList) => setFilteredEmails(newList)}
					selectedEmails={selectedEmails}
					setSelectedEmails={(value) => setSelectedEmails(value)}
					tag={tag}
					tagsList={tagsList}
					setEmail={(email) => setEmail(email)}
				/>
			) : (
				<EmailsView
					email={email}
					clearEmail={() => setEmail(null)}
					tagsList={tagsList}
				/>
			)}
		</div>
	)
}

export default Content
