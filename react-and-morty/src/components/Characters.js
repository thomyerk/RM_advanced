import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
import ReactPaginate from "react-paginate"
import MoreInfo from "./MoreInfo"

export default function Characters(props) {
	const charactersFetched = props.characters.results
	const pages = props.characters.info.pages
	const [open, setOpen] = useState(false)
	const [actualCharacter, setActualCharacter] = useState("")

	const handleOpen = (target) => {
		setActualCharacter(charactersFetched.find((x) => x.id == target))
		setOpen(true)
	}

	const handleClose = (target) => {
		setOpen(false)
	}

	const characterData = Object.entries(actualCharacter)

	console.log(actualCharacter)
	return (
		<div>
			{charactersFetched.map((character) => (
				<div key={character.id} className="characterCard">
					<h1>{character.name}</h1>
					<img
						id={character.id}
						src={character.image}
						onClick={(ev) => handleOpen(ev.target.id)}
					/>
					<p>{character.species}</p>
				</div>
			))}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description">
				{<MoreInfo data={characterData} />}
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
