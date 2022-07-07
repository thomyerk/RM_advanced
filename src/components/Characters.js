import React, { useState, useEffect } from "react"
import UniversalModal from "./Modal"
import ReactPaginate from "react-paginate"
import SearchBar from "./SearchBar"
import useLocalStorage from "./assets/useLocalStorage"

export default function Characters(props) {
	const charactersFetched = props.characters.results
	const pages = props.characters.info.pages
	const [open, setOpen] = useState(false)
	const [actualCharacter, setActualCharacter] = useState("")
	const [history, setHistory] = useLocalStorage("history", [])

	const handleOpen = (target) => {
		setActualCharacter(
			charactersFetched.find((x) => x.id === parseInt(target))
		)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		if (actualCharacter !== "") {
			setHistory([...history, actualCharacter.name])
		}
	}, [actualCharacter])

	const characterData = Object.entries(actualCharacter)

	return (
		<>
			<SearchBar filter={props.filter} />
			{charactersFetched.map((character) => (
				<div key={character.id} className="listCard">
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
			asdsdasdas
			<UniversalModal
				displayData={characterData}
				open={open}
				closeHandler={handleClose}
			/>
			<ReactPaginate
				previousLabel={"prev"}
				nextLabel={"next"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={pages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={props.handlePageClick}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
			/>
		</>
	)
}
