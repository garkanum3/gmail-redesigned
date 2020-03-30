import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import App from './App'

test('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<App />, div)
	ReactDOM.unmountComponentAtNode(div)
})

test('renders compose button', () => {
	const { getByText } = render(<App />)
	const linkElement = getByText(/Compose/i)
	expect(linkElement).toBeInTheDocument()
})
