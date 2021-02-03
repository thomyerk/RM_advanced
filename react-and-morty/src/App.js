import React from "react"
import "./style.css"
import { useCharacters, useLocations } from "./api/useData"
import Logo from "./components/logo"
import Buttons from "./components/buttons"
import Infotext from "./components/description"

function App() {
	const characters = useCharacters(1)
	const locations = useLocations(1)

	let charactersFetched = []
	if (characters != "Loading...") {
		charactersFetched = characters.results
		console.log(characters)
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
		</div>
	)
}

function CharacterList() {}

export default App
