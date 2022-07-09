import React from "react";
import { A } from "hookrouter";

const Logo = () => {
	let rmImage = process.env.PUBLIC_URL + "/img/rick-and-morty.jpg";
	return (
		<div id="openimage">
			<A href="/">
				<img src={rmImage} alt={rmImage} />
			</A>
		</div>
	);
};
export default Logo;
