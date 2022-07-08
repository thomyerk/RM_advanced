import React, { useState, useEffect } from "react";
import UniversalModal from "./Modal";
import ReactPaginate from "react-paginate";
import SearchBar from "./SearchBar";
import useFetch from "../api/useFetch";
import { mainUrls } from "../api/dataRoutes";

const Characters = (props) => {
	// let charactersFetched = props.characters.results;
	// const [charactersFetched, setCharactersFetched] = useState(
	// 	props.characters.results
	// );
	const pages = props.characters.info.pages;
	const [open, setOpen] = useState(false);
	const [actualCharacter, setActualCharacter] = useState("");
	const [filterObject, setFilterObject] = useState({
		name: "",
		gender: "",
		type: "",
		status: "",
		species: "",
	});

	const [charactersFetched, setUrl] = useFetch(mainUrls(1).characters);

	useEffect(() => {
		setUrl(mainUrls(1, filterObject).filterSearch);
	}, [filterObject]);

	console.log("charactersFetched", charactersFetched);

	// const fetchWithFilters = useFetch(1, filterObject.gender);

	// setCharactersFetched(fetchWithFilters);

	const handleOpen = (target) => {
		setActualCharacter(
			charactersFetched.find((x) => x.id === parseInt(target))
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

	const characterData = Object.entries(actualCharacter);

	return (
		<>
			<div className="filter-container">
				<SearchBar filter={props.filter} />
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
				{/* <button onClick={handleFilter}>Filter</button> */}
			</div>
			{charactersFetched &&
				Object.entries(charactersFetched).map((character) => (
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
				))}
			asdsdasdas
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
				pageCount={pages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={props.handlePageClick}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
			/>
		</>
	);
};
export default Characters;
