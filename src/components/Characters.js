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
	} = useCharacters(history, setHistory);

	if (!charactersFetched) {
		return null;
	}

	if (charactersFetched == 404) {
		return "Oopss....theres nothing, Morty. Please reload";
	}

	return (
		<>
			<div className="filter-container">
				<div className="search-bar">
					<input
						onChange={(e) => setNameFilter(e.currentTarget.value)}
						defaultValue={filterObject.name}
						placeholder="Name"></input>
					{loading && <LoadingSpinner />}
				</div>
				<select
					className="filter"
					placeholder="Choose a status"
					onChange={(e) =>
						setFilterObject({ ...filterObject, status: e.currentTarget.value })
					}>
					<option value="">Choose status</option>
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
					<option value="">Choose gender</option>
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
				<button className="filter-button" onClick={handleFilter}>
					Filter
				</button>
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
				: "Oopss....theres no results, Morty"}

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
