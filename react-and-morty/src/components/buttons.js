import React from "react"

const Buttons = () => {
	let button1 = process.env.PUBLIC_URL + "/img/characters.jpg"
	let button2 = process.env.PUBLIC_URL + "/img/locations.jpg"
	return (
		<div id="openbuttons">
			<img src={button1} alt={button1} />
			<img src={button2} alt={button2} />
		</div>
	)
}
export default Buttons
