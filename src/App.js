import React, { useEffect, useState } from "react";
import "./App.css";
import Characters from "./components/Characters";
import Description from "./components/Description";
import Episodes from "./components/Episodes";
import useLocalStorage from "./components/helpers/useLocalStorage";
import History from "./components/History";
import Locations from "./components/Locations";
import Logo from "./components/Logo";
import "./style.css";

function App() {
	let charactersButton = process.env.PUBLIC_URL + "/img/characters.jpg";
	let locationsButton = process.env.PUBLIC_URL + "/img/locations.jpg";
	const [content, setContent] = useState("description");
	const [history, setHistory] = useLocalStorage("history", []);

	useEffect(() => {
		const data = window.localStorage.getItem("history");
		if (data) {
			setHistory(JSON.parse(data));
		}
	}, []);

	return (
		<div className="App">
			<Logo onClick={() => setContent("description")} />
			<div id="openbuttons">
				<a onClick={() => setContent("characters")}>
					<img src={charactersButton} alt={"charactersButton"} />
				</a>
				<a onClick={() => setContent("locations")}>
					<img src={locationsButton} alt={"locationsButton"} />
				</a>
				<a onClick={() => setContent("episodes")}>
					Episodes
					<img src={locationsButton} alt={"episodesButton"} />
				</a>
			</div>
			<div className="content">
				{content === "characters" ? (
					<Characters setHistory={setHistory} history={history} />
				) : content === "locations" ? (
					<Locations setHistory={setHistory} history={history} />
				) : content === "episodes" ? (
					<Episodes />
				) : (
					<Description />
				)}
			</div>
			<History history={history} />
		</div>
	);
}

export default App;
