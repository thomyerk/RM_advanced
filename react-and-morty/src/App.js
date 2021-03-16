import React, { useState } from "react"
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
	const [characterPages, setCharacterPages] = useState(1)
	const [locationPages, setLocationPages] = useState(1)
	const [content, setContent] = useState("description")

	const locations = useLocations(locationPages)
	const characters = useCharacters(characterPages)

	const handlePageClick = (e) => {
		content === "characters"
			? setCharacterPages(e.selected + 1)
			: setLocationPages(e.selected + 1)
		window.scrollTo(0, 0)
	}

	let charactersFetched = []
	let locationsFetched = []

	if (characters !== "Loading...") {
		charactersFetched = characters
	}
	if (locations !== "Loading...") {
		locationsFetched = locations
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
		</div>
	)
}

export default App
