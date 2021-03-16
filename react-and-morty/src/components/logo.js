import React from "react"

const Logo = () => {
	let rmImage = process.env.PUBLIC_URL + "/img/rick-and-morty.jpg"
	return (
		<div id="openimage">
			<a href="/">
				<img src={rmImage} alt={rmImage} />
			</a>
		</div>
	)
}
export default Logo
