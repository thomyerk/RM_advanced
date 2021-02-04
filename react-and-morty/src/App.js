import React, { useState, useEffect } from "react"
import "./style.css"
import "./App.css"
import { useCharacters, useLocations } from "./api/useData"
import Logo from "./components/Logo"
import Infotext from "./components/Description"
import Characters from "./components/Characters"
import Locations from "./components/Locations"

function App() {
	let charactersButton = process.env.PUBLIC_URL + "/img/characters.jpg"
	let locationsButton = process.env.PUBLIC_URL + "/img/locations.jpg"
	const [page, setPage] = useState(1)
	const [offset, setOffset] = useState(1)
	const [pageCount, setPageCount] = useState(1)
	const [content, setContent] = useState("description")

	const locations = useLocations(page)
	const characters = useCharacters(page)
	//locations is megkapja a paget - nincs annyi mint characternél

	const handlePageClick = (e) => {
		setPage(e.selected + 1)
	}

	// useEffect(() => {
	// 	useCharacters(offset)
	// }, [offset])

	let charactersFetched = []
	let locationsFetched = []

	let pages = 1
	if (characters !== "Loading...") {
		charactersFetched = characters
		pages = characters.info.pages
	}
	if (locations !== "Loading...") {
		locationsFetched = locations
		pages = locations.info.pages
	}

	//setPageCount(pages)
	return (
		<div className="App">
			<Logo onClick={() => setContent("description")} />
			<div id="openbuttons">
				<img
					src={charactersButton}
					alt={"charactersButton"}
					onClick={() => setContent("characters")}
				/>
				<img
					src={locationsButton}
					alt={"locationsButton"}
					onClick={() => setContent("locations")}
				/>
			</div>

			{content === "characters" ? (
				<Characters
					characters={charactersFetched}
					handlePageClick={handlePageClick}
				/>
			) : content === "locations" ? (
				<Locations
					locations={locationsFetched}
					handlePageClick={handlePageClick}
				/>
			) : (
				<Infotext />
			)}

			{/* <ReactPaginate
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
			/> */}
		</div>
	)
}

export default App
