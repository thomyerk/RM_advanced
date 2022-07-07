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
import SearchBar from "./components/SearchBar"

function App() {
	let charactersButton = process.env.PUBLIC_URL + "/img/characters.jpg"
	let locationsButton = process.env.PUBLIC_URL + "/img/locations.jpg"
	const [characterPages, setCharacterPages] = useState(1)
	const [locationPages, setLocationPages] = useState(1)
	const [content, setContent] = useState("description")
	const [searchTerm, setSearchTerm] = useState(null)

	useEffect(() => {
		if (content === "characters") {
			useSearchForCharacter(characterPages, searchTerm)
		}
		if (content === "locations") {
			useSearchForLocation(locationPages, searchTerm)
		}
	}, [searchTerm])

	useEffect(() => {
		const locations = useLocations(locationPages)
		const characters = useCharacters(characterPages)
		setCharacters(characters)
		setLocations(locations)
	}, [third])

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
					/>
				) : content === "locations" ? (
					<Locations
						locations={locationsFetched}
						handlePageClick={handlePageClick}
					/>
				) : (
					<Description />
				)}
			</div>
		</div>
	)
}

export default App
