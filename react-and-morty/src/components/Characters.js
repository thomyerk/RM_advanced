import React from "react"

import Modal from "@material-ui/core/Modal"
import ReactPaginate from "react-paginate"

export default function Characters(props) {
	const charactersFetched = props.characters.results
	const pages = props.characters.info.pages
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			{charactersFetched.map((character) => (
				<div
					key={character.id}
					className="characterCard"
					onClick={() => handleOpen()}>
					<h1>{character.name}</h1>
					<img src={character.image} />
					<p>{character.species}</p>
				</div>
			))}
			{/* <Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description">
				{props.id}
			</Modal> */}
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
