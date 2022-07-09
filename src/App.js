import React, { useEffect, useState } from "react";
import "./App.css";
import Characters from "./components/Characters";
import Description from "./components/Description";
import Episodes from "./components/Episodes";
import useLocalStorage from "./components/hooks/useLocalStorage";
import History from "./components/History";
import Locations from "./components/Locations";
import Logo from "./components/Logo";
import "./style.css";
import { usePath, A } from "hookrouter";

function App() {
	let charactersButton = process.env.PUBLIC_URL + "/img/characters.jpg";
	let locationsButton = process.env.PUBLIC_URL + "/img/locations.jpg";
	const [history, setHistory] = useLocalStorage("history", []);

	const path = usePath();

	useEffect(() => {
		const data = window.localStorage.getItem("history");
		if (data) {
			setHistory(JSON.parse(data));
		}
	}, []);

	// TODO: empty queryparams when navigate from episodes then go to characters main page
	// TODO: episodes button

	return (
		<div className="App">
			<Logo />
			<div id="openbuttons">
				{/* use custom A component from hookrouter to push path into history instead of navigating, to preserve flow */}
				<A href="/characters">
					<img src={charactersButton} alt={"charactersButton"} />
				</A>
				<A href="/locations">
					<img src={locationsButton} alt={"locationsButton"} />
				</A>
				<A href="/episodes">
					Episodes
					<img src={locationsButton} alt={"episodesButton"} />
				</A>
			</div>
			<div className="content">
				{path.includes("/characters") ? (
					<Characters setHistory={setHistory} history={history} />
				) : path.includes("/locations") ? (
					<Locations setHistory={setHistory} history={history} />
				) : path.includes("/episodes") ? (
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
