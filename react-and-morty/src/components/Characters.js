import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import ReactPaginate from "react-paginate"

export default function Characters(props) {
	const charactersFetched = props.characters.results
	const pages = props.characters.info.pages
	const [open, setOpen] = useState(false)
	const [actualCharacter, setActualCharacter] = useState("")

	const handleOpen = (target) => {
		setActualCharacter(
			charactersFetched.find((x) => x.id === parseInt(target))
		)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const characterData = Object.entries(actualCharacter)

	const body = (
		<div>
			{characterData.map((elem, index) => {
				if (typeof elem[1] === "string" || typeof elem[1] === "number")
					return (
						<p key={index}>
							{elem[0]} :{elem[1]}
						</p>
					)
			})}
		</div>
	)

	return (
		<div>
			{charactersFetched.map((character) => (
				<div key={character.id} className="characterCard">
					<h1>{character.name}</h1>
					<img
						id={character.id}
						src={character.image}
						onClick={(ev) => handleOpen(ev.target.id)}
						alt={character.name}
					/>
					<p>{character.species}</p>
				</div>
			))}
			<Modal
				className="modal"
				data={characterData}
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description">
				{body}
			</Modal>
			<ReactPaginate
				previousLabel={"prev"}
				nextLabel={"next"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={pages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={props.handlePageClick}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
			/>
		</div>
	)
}
