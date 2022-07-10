import React from "react";
import UniversalModal from "./Modal";
import ReactPaginate from "react-paginate";
import useLocations from "./hooks/use-locations";
import LoadingSpinner from "./LoadingSpinner";

export default function Locations(props) {
	const {
		locationsFetched,
		setLocationFilter,
		handleOpen,
		locationData,
		open,
		handleClose,
		currentPage,
		handlePageClick,
		loading,
		locationFilter,
	} = useLocations(props);

	if (!locationsFetched) {
		return null;
	}

	if (locationsFetched === 404) {
		return "Oopss....theres nothing, Morty. Please reload";
	}

	return (
		<>
			<div className="search-bar">
				<input
					onChange={(e) => setLocationFilter(e.currentTarget.value)}
					defaultValue={locationFilter}></input>
				{loading && <LoadingSpinner />}
			</div>
			{locationsFetched.results
				? locationsFetched.results.map((location) => (
						<div
							key={location.id}
							id={location.id}
							onClick={(ev) => handleOpen(ev.target.id)}
							className="listCard location">
							<h1 id={location.id}>{location.name}</h1>
							<p id={location.id}>{location.type}</p>
						</div>
				  ))
				: "Oopss....theres no results, Morty"}
			<UniversalModal
				displayData={locationData}
				open={open}
				closeHandler={handleClose}
			/>
			<ReactPaginate
				previousLabel={"prev"}
				nextLabel={"next"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={
					locationsFetched && locationsFetched.info.pages
						? locationsFetched.info.pages
						: currentPage
				}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
			/>
		</>
	);
}
