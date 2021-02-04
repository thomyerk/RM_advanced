import React from "react"

export default function MoreInfo(props) {
	return (
		<div>
			{props.data.map((elem) => {
				console.log(elem)
				if (typeof elem[1] === "string" || typeof elem[1] === "number")
					return (
						<p key={elem.id}>
							{elem[0]} :{elem[1]}
						</p>
					)
			})}
		</div>
	)
}
