import React from "react";
import ReactPaginate from "react-paginate";
import useCharacters from "./hooks/use-characters";
import LoadingSpinner from "./LoadingSpinner";
import UniversalModal from "./Modal";

const Characters = ({ history, setHistory }) => {
	const {
		setNameFilter,
		filterObject,
		setFilterObject,
		charactersFetched,
		handleFilter,
		characterData,
		handleClose,
		handlePageClick,
		loading,
		handleOpen,
		currentPage,
		open,
		nameFilter,
	} = useCharacters(history, setHistory);

	if (!charactersFetched) {
		return null;
	}

	if (charactersFetched === 404) {
		return (
			<div className="error-message">
				Oopss....theres nothing, Morty. Please reload
			</div>
		);
	}

	return (
		<>
			<div className="filter-container">
				<div className="search-bar">
					<input
						onChange={(e) => setNameFilter(e.currentTarget.value)}
						value={nameFilter}
						placeholder="Name"></input>
					{loading && <LoadingSpinner />}
				</div>
				{/* all filters will be applied on the filter button, except the name which use live search */}
				<select
					className="filter"
					placeholder="Choose a status"
					onChange={(e) =>
						setFilterObject({ ...filterObject, status: e.currentTarget.value })
					}>
					<option value="">Choose status</option>
					<option value="alive">Alive</option>
					<option value="dead">Dead</option>
					<option value="unknown">Unknown</option>
				</select>
				<select
					className="filter"
					defaultValue={"Choose a gender"}
					onChange={(e) =>
						setFilterObject({ ...filterObject, gender: e.currentTarget.value })
					}>
					<option value="">Choose gender</option>
					<option value="female">Female</option>
					<option value="male">Male</option>
					<option value="genderless">Genderless</option>
					<option value="unknown">Unknown</option>
				</select>
				<input
					type="text"
					placeholder="Species"
					onChange={(e) =>
						setFilterObject({ ...filterObject, species: e.currentTarget.value })
					}></input>
				<input
					type="text"
					placeholder="Type"
					onChange={(e) =>
						setFilterObject({ ...filterObject, type: e.currentTarget.value })
					}
				/>
				<button className="filter-button" onClick={handleFilter}>
					Filter
				</button>
			</div>
			{charactersFetched.results ? (
				charactersFetched.results.map((character) => (
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
			) : (
				<div className="error-message">"Oopss....theres no results, Morty"</div>
			)}

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
				pageCount={
					charactersFetched && charactersFetched.info.pages
						? charactersFetched.info.pages
						: currentPage
				}
				// current page needs to be taken from 1 instead of 0 to use it correctly at fetching. with forcePage i control the current page from my state instead of the component itself
				forcePage={currentPage - 1}
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
