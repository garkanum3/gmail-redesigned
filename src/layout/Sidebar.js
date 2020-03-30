import React from 'react'

const convertHex = (hexCode) => {
	const r = parseInt(hexCode.slice(1, 3), 16)
	const g = parseInt(hexCode.slice(3, 5), 16)
	const b = parseInt(hexCode.slice(5, 7), 16)
	const a = 0.3

	return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
}

const Sidebar = ({ tag, tagsList, setTag }) => {
	return (
		<div className="col-md-2 d-none d-md-block sidebar">
			<div className="sidebar-sticky">
				<div className="btn-compose-container d-xs-block">
					<button type="button" className="btn btn-compose">
						Compose
					</button>
				</div>
				<ul className="nav flex-column">
					{tagsList.map((t, i) => (
						<li key={i} className="nav-item" onClick={() => setTag(t.name)}>
							<a
								className="nav-link"
								href="#"
								style={{
									backgroundColor: tag === t.name && convertHex(t.color),
									color: tag === t.name && t.color,
									fontWeight: tag === t.name && '600',
								}}
							>
								{t.name.charAt(0).toUpperCase() + t.name.slice(1)}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
