import React, { useState, useEffect } from "react";
import UniversalModal from "./Modal";
import ReactPaginate from "react-paginate";
import useEpisodes from "./hooks/use-episodes";
import LoadingSpinner from "./LoadingSpinner";

export default function Episodes(props) {
	const {
		episodeData,
		handleClose,
		episodeFilterTerm,
		handlePageClick,
		handleOpen,
		episodesFetched,
		openModal,
		setEpisodeFilterTerm,
		currentPage,
		loading,
		selectedEpisode,
	} = useEpisodes();

	if (!episodesFetched) {
		return null;
	}

	if (episodesFetched == 404) {
		return "Oopss....theres nothing, Morty. Please reload";
	}

	return (
		<>
			<div className="search-bar">
				<input
					onChange={(e) => setEpisodeFilterTerm(e.currentTarget.value)}
					defaultValue={episodeFilterTerm}></input>
				{loading && <LoadingSpinner />}
			</div>
			{episodesFetched.results
				? episodesFetched.results.map((location) => (
						<div
							key={location.id}
							id={location.id}
							onClick={(ev) => handleOpen(ev.target.id)}
							className="listCard episodes">
							<h1 id={location.id}>{location.name}</h1>
							<p id={location.id}>{location.type}</p>
						</div>
				  ))
				: "Oopss....theres no results, Morty"}
			<UniversalModal
				displayData={episodeData}
				open={openModal}
				closeHandler={handleClose}
				episodeCharacters={selectedEpisode.characters}
			/>
			<ReactPaginate
				previousLabel={"prev"}
				nextLabel={"next"}
				breakLabel={"..."}
				breakClassName={"break-me"}
				pageCount={
					episodesFetched && episodesFetched.info.pages
						? episodesFetched.info.pages
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
