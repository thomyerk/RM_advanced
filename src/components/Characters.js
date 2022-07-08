import React, { useState, useEffect } from "react";
import UniversalModal from "./Modal";
import ReactPaginate from "react-paginate";
import SearchBar from "./SearchBar";
import useFetch from "../api/useFetch";
import { mainUrls } from "../api/dataRoutes";

const Characters = (props) => {
	const [characterPages, setCharacterPages] = useState(1);
	const [open, setOpen] = useState(false);
	const [actualCharacter, setActualCharacter] = useState("");
	const [filterObject, setFilterObject] = useState({
		name: "",
		gender: "",
		type: "",
		status: "",
		species: "",
	});

	const handlePageClick = (e) => {
		setUrl(mainUrls(e.selected + 1, filterObject).filterSearch);
		setCharacterPages(e.selected + 1);
		window.scrollTo(0, 0);
	};

	const [charactersFetched, setUrl] = useFetch();
	console.log("charactersFetched", charactersFetched);

	const handleFilter = () => {
		setCharacterPages(1);
		setUrl(mainUrls(characterPages, filterObject).filterSearch);
	};

	const handleOpen = (target) => {
		setActualCharacter(
			charactersFetched.results.find((x) => x.id === parseInt(target))
		);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (actualCharacter !== "") {
			props.setHistory([...props.history, actualCharacter.name]);
		}
	}, [actualCharacter]);

	useEffect(() => {
		setUrl(mainUrls(1).characters);
	}, []);

	const characterData = Object.entries(actualCharacter);

	if (!charactersFetched) {
		return null;
	}

	return (
		<>
			<div className="filter-container">
				<SearchBar
					filter={(val) => setFilterObject({ ...filterObject, name: val })}
				/>
				<select
					className="filter"
					placeholder="Choose a status"
					onChange={(e) =>
						setFilterObject({ ...filterObject, status: e.currentTarget.value })
					}>
					<option value="alive">alive</option>
					<option value="dead">dead</option>
					<option value="unknown">unknown</option>
				</select>
				<select
					className="filter"
					defaultValue={"Choose a gender"}
					onChange={(e) =>
						setFilterObject({ ...filterObject, gender: e.currentTarget.value })
					}>
					<option value="female">female</option>
					<option value="male">male</option>
					<option value="genderless">genderless</option>
					<option value="unknown">unknown</option>
				</select>
				<input
					type="text"
					placeholder="species"
					onChange={(e) =>
						setFilterObject({ ...filterObject, species: e.currentTarget.value })
					}></input>
				<input
					type="text"
					placeholder="type"
					onChange={(e) =>
						setFilterObject({ ...filterObject, type: e.currentTarget.value })
					}
				/>
				<button onClick={handleFilter}>Filter</button>
			</div>
			{charactersFetched.results
				? charactersFetched.results.map((character) => (
						<div key={character.id} className="listCard">
							<h1>{character.name}</h1>
							<img
								id={character.id}
								src={character.image}
								onClick={(ev) => handleOpen(ev.target.id)}
								alt={character.name}
							/>
							<p>{character.species}</p>
						</div>
				  ))
				: "Oopss....there was some problem, Morty"}

			<UniversalModal
				displayData={characterData}
				open={open}
				closeHandler={handleClose}
			/>
			<ReactPaginate
				previousLabel={"prev"}
				nextLabel={"next"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={charactersFetched.info.pages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}

			/>
		</>
	);
};

export default Characters;
