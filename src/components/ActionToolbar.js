import React from 'react'
import { Dropdown, Button, ButtonToolbar } from 'react-bootstrap'

const ActionToolbar = ({
	tagsList,
	filteredEmails,
	setFilteredEmails,
	selectedEmails,
	setSelectedEmails,
}) => {
	const markRead = () => {
		let tempList = filteredEmails
		selectedEmails.forEach((ind) => {
			tempList[ind].read = true
		})
		setFilteredEmails(tempList)
		setSelectedEmails([])
	}

	const markUnread = () => {
		let tempList = filteredEmails
		selectedEmails.forEach((ind) => {
			tempList[ind].read = false
		})
		setFilteredEmails(tempList)
		setSelectedEmails([])
	}

	const addTag = (tag) => {
		let tempList = filteredEmails
		selectedEmails.forEach((ind) => {
			tempList[ind].tags.push(tag.name)
		})
		setFilteredEmails(tempList)
		setSelectedEmails([])
	}

	const deleteEmail = () => {
		let tempList = filteredEmails
		selectedEmails.forEach((ind) => {
			tempList.splice(ind, 1)
		})
		setFilteredEmails(tempList)
		setSelectedEmails([])
	}

	return (
		<ButtonToolbar className="action-toolbar">
			<Button
				variant="outline-secondary"
				size="sm"
				className="mx-1"
				disabled={selectedEmails.length === 0}
				onClick={() => markRead()}
			>
				Mark as Read
			</Button>
			<Button
				variant="outline-secondary"
				size="sm"
				className="mx-1"
				disabled={selectedEmails.length === 0}
				onClick={() => markUnread()}
			>
				Mark as Unread
			</Button>
			<Dropdown className="mx-1">
				<Dropdown.Toggle
					variant="outline-secondary"
					size="sm"
					id="dropdown-basic"
					disabled={selectedEmails.length === 0}
				>
					Add Tag
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{tagsList.map((tag, i) => (
						<Dropdown.Item
							key={i}
							onClick={() => addTag(tag)}
							style={{ color: tag.color }}
						>
							{tag.name}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
			<Button
				variant="outline-danger"
				size="sm"
				className="mx-1"
				disabled={selectedEmails.length === 0}
				onClick={() => deleteEmail()}
			>
				Delete
			</Button>
		</ButtonToolbar>
	)
}

export default ActionToolbar
