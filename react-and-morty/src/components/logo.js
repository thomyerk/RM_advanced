import React from "react"

const Logo = () => {
	let rmImage = process.env.PUBLIC_URL + "/img/rick-and-morty.jpg"
	return (
		<div id="openimage">
			<img src={rmImage} alt={rmImage} />
		</div>
	)
}
export default Logo
