import React from "react";
import useContent from "./hooks/use-content";
import LoadingSpinner from "./LoadingSpinner";
import ReactPaginate from "react-paginate";
import UniversalModal from "./Modal";

const Content = ({ history, setHistory, contentType }) => {
	const {
		setNameFilter,
		filterObject,
		setFilterObject,
		contentFetched,
		handleFilter,
		modalData,
		handleClose,
		handlePageClick,
		loading,
		handleOpen,
		currentPage,
		open,
		nameFilter,
		selectedItem,
	} = useContent(history, setHistory, contentType);

	if (!contentFetched) {
		return null;
	}

	if (contentFetched === 404) {
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
				{contentType === "character" && (
					<>
						<select
							className="filter"
							placeholder="Choose a status"
							onChange={(e) =>
								setFilterObject({
									...filterObject,
									status: e.currentTarget.value,
								})
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
								setFilterObject({
									...filterObject,
									gender: e.currentTarget.value,
								})
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
								setFilterObject({
									...filterObject,
									species: e.currentTarget.value,
								})
							}></input>
						<input
							type="text"
							placeholder="Type"
							onChange={(e) =>
								setFilterObject({
									...filterObject,
									type: e.currentTarget.value,
								})
							}
						/>
						<button className="filter-button" onClick={handleFilter}>
							Filter
						</button>
					</>
				)}
			</div>
			{contentFetched.results ? (
				contentFetched.results.map((content) => (
					<div
						key={content.id}
						onClick={() => handleOpen(content.id)}
						className="listCard">
						<h1>{content.name}</h1>
						{contentType === "character" && (
							<>
								<img id={content.id} src={content.image} alt={content.name} />
								<p>{content.species}</p>
							</>
						)}
						{contentType === "location" && (
							<p id={content.id}>{content.type}</p>
						)}
						{contentType === "episode" && (
							<p id={content.id}>{content.episode}</p>
						)}
					</div>
				))
			) : (
				<div className="error-message">"Oopss....theres no results, Morty"</div>
			)}

			<UniversalModal
				displayData={modalData}
				open={open}
				closeHandler={handleClose}
				episodeCharacters={
					contentType === "episode" && selectedItem && selectedItem !== {}
						? selectedItem.characters
						: null
				}
			/>
			<ReactPaginate
				previousLabel={"prev"}
				nextLabel={"next"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={
					contentFetched && contentFetched.info.pages
						? contentFetched.info.pages
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

export default Content;
