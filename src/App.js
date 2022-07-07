import React, { useState, useEffect } from "react"
import "./style.css"
import "./App.css"
import {
	useSearchForLocation,
	useCharacters,
	useLocations,
	useSearchForCharacter,
} from "./api/useData"
import Logo from "./components/Logo"
import Description from "./components/Description"
import Characters from "./components/Characters"
import Locations from "./components/Locations"
import History from "./components/History"

function App() {
	let charactersButton = process.env.PUBLIC_URL + "/img/characters.jpg"
	let locationsButton = process.env.PUBLIC_URL + "/img/locatigions.jpg"
	const [characterPages, setCharacterPages] = useState(1)
	const [locationPages, setLocationPages] = useState(1)
	const [content, setContent] = useState("description")
	const [locationFilter, setLocationFilter] = useState(null)
	const [characterFilter, setCharacterFilter] = useState(null)

	const locations = useLocations(locationPages, locationFilter)
	const characters = useCharacters(characterPages, characterFilter)

	const handlePageClick = (e) => {
		content === "characters"
			? setCharacterPages(e.selected + 1)
			: setLocationPages(e.selected + 1)
		window.scrollTo(0, 0)
	}

	let charactersFetched = []
	let locationsFetched = []

	if (characters !== "Loading...") {
		setCharacters(useCharacters(characterPages))
	}
	if (locations !== "Loading...") {
		setLocations(useLocations(locationPages))
	}
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
			<div className="content">
				{content !== "description" && (
					<SearchBar setSearch={setSearchTerm} value={searchTerm} />
				)}
				{content === "characters" ? (
					<Characters
						characters={charactersFetched}
						handlePageClick={handlePageClick}
						filter={setCharacterFilter}
					/>
				) : content === "locations" ? (
					<Locations
						locations={locationsFetched}
						handlePageClick={handlePageClick}
						filter={setLocationFilter}
					/>
				) : (
					<Description />
				)}
			</div>
			<History />
		</div>
	)
}

export default App
