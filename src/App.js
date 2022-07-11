import { A, setLinkProps, usePath, useQueryParams } from "hookrouter";
import React, { useEffect } from "react";
import "./App.css";
import Content from "./components/Content";
import Description from "./components/Description";
import History from "./components/History";
import useLocalStorage from "./components/hooks/useLocalStorage";
import Logo from "./components/Logo";
import "./style.css";

function App() {
	let charactersButton = process.env.PUBLIC_URL + "/img/characters.jpg";
	let locationsButton = process.env.PUBLIC_URL + "/img/locations.jpg";
	let episodesButton = process.env.PUBLIC_URL + "/img/episodes.png";
	const [history, setHistory] = useLocalStorage("history", []);

	// use path from hookrouter for rendering the right component
	const path = usePath();

	// get historical data from localStorage
	useEffect(() => {
		const data = window.localStorage.getItem("history");
		if (data) {
			setHistory(JSON.parse(data));
		}
	}, []);

	// using the custom functions of A component of hookrouter, to be able to navigate without page loading, and to clear query parameters
	const [queryParams, setQuery] = useQueryParams();

	const buttonProps = (href) => {
		return {
			href,
			onClick: () => {
				setQuery({}, true);
			},
		};
	};

	return (
		<div className="App">
			<Logo />
			<div id="openbuttons">
				{/* use custom A component from hookrouter to push path into history instead of navigating, to preserve SPA feel */}
				<A {...setLinkProps(buttonProps("/characters"))}>
					<img src={charactersButton} alt={"charactersButton"} />
				</A>
				<A {...setLinkProps(buttonProps("/locations"))}>
					<img src={locationsButton} alt={"locationsButton"} />
				</A>
				<A {...setLinkProps(buttonProps("/episodes"))}>
					<img src={episodesButton} alt={"episodesButton"} />
				</A>
			</div>
			<div className="content">
				{path.includes("/characters") ? (
					<Content
						setHistory={setHistory}
						history={history}
						contentType={"character"}
					/>
				) : path.includes("/locations") ? (
					<Content
						setHistory={setHistory}
						history={history}
						contentType={"location"}
					/>
				) : path.includes("/episodes") ? (
					<Content
						contentType={"episode"}
						setHistory={setHistory}
						history={history}
					/>
				) : (
					<Description />
				)}
			</div>
			<History history={history} />
		</div>
	);
}

export default App;
