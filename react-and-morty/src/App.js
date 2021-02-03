import React, { useState, useEffect } from "react"
import "./style.css"
import "./App.css"
import { useCharacters, useLocations } from "./api/useData"
import Logo from "./components/Logo"
import Buttons from "./components/Buttons"
import Infotext from "./components/Description"
import ReactPaginate from "react-paginate"

function App() {
	const locations = useLocations(1)

	const [page, setPage] = useState(1)
	const [offset, setOffset] = useState(1)
	const [pageCount, setPageCount] = useState(34)

	const characters = useCharacters(page)

	const handlePageClick = (e) => {
		setPage(e.selected)
	}

	// useEffect(() => {
	// 	useCharacters(offset)
	// }, [offset])

	let charactersFetched = []
	let pages = 0
	if (characters != "Loading...") {
		charactersFetched = characters.results
		pages = characters.info.pages
		console.log(pages)
	}

	return (
		<div className="App">
			<Logo />
			<Buttons />
			<Infotext />

			{charactersFetched.map((character) => (
				<div key={character.id} className="characterCard">
					<h1>{character.name}</h1>
					<img src={character.image} />
					<p>{character.species}</p>
				</div>
			))}
			<ReactPaginate
				previousLabel={"prev"}
				nextLabel={"next"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
				onClick={(e) => handlePageClick(e)}
			/>
		</div>
	)
}

export default App
