import React from "react";
import UniversalModal from "./Modal";
import ReactPaginate from "react-paginate";
import useLocations from "./hooks/use-locations";
import LoadingSpinner from "./LoadingSpinner";
import ListCard from './ListCard'

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

	if (locationsFetched == 404) {
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
						<ListCard
							listItem={location}
							type={"location"}
							handleOpen={handleOpen}
						/>
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
