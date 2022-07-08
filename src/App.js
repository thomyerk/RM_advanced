import React, { useState, useEffect } from "react";
import "./style.css";
import "./App.css";
import {
	useSearchForLocation,
	useCharacters,
	useLocations,
	useSearchForCharacter,
} from "./api/useData";
import Logo from "./components/Logo";
import Description from "./components/Description";
import Characters from "./components/Characters";
import Locations from "./components/Locations";
import History from "./components/History";
import useLocalStorage from "./components/helpers/useLocalStorage";

function App() {
	let charactersButton = process.env.PUBLIC_URL + "/img/characters.jpg";
	let locationsButton = process.env.PUBLIC_URL + "/img/locations.jpg";
	const [characterPages, setCharacterPages] = useState(1);
	const [locationPages, setLocationPages] = useState(1);
	const [content, setContent] = useState("description");
	const [history, setHistory] = useLocalStorage("history", []);

	// const locations = useLocations(locationPages);
	// const characters = useCharacters(characterPages);

	useEffect(() => {
		const data = window.localStorage.getItem("history");
		if (data) {
			setHistory(JSON.parse(data));
		}
	}, []);

	// let charactersFetched = [];
	// let locationsFetched = [];

	// if (characters !== "Loading...") {
	// 	charactersFetched = characters;
	// }
	// if (locations !== "Loading...") {
	// 	locationsFetched = locations;
	// }
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
				{content === "characters" ? (
					<Characters setHistory={setHistory} history={history} />
				) : content === "locations" ? (
					<Locations setHistory={setHistory} history={history} />
				) : (
					<Description />
				)}
			</div>
			<History history={history} />
		</div>
	);
}

export default App;
