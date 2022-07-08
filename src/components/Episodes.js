import React, { useState, useEffect } from "react";
import UniversalModal from "./Modal";
import ReactPaginate from "react-paginate";
import SearchBar from "./SearchBar";
import useFetch from "../api/useFetch";
import { mainUrls } from "../api/dataRoutes";

export default function Episodes(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [selectedEpisode, setSelectedEpisode] = useState("");
	const [episodeFilterTerm, setEpisodeFilterTerm] = useState(null);
	const [episodesFetched, setUrl] = useFetch(mainUrls(1).episodeSearchRoute);

	console.log("selectedEpisode", selectedEpisode);

	const handleOpen = (target) => {
		setSelectedEpisode(
			episodesFetched.results.find((x) => x.id === parseInt(target))
		);
		setOpenModal(true);
	};

	const handlePageClick = (e) => {
		setUrl(mainUrls(e.selected + 1, episodeFilterTerm).episodeSearchRoute);
		setCurrentPage(e.selected + 1);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		console.log(mainUrls(1, episodeFilterTerm).episodeSearchRoute);
		setUrl(mainUrls(1, episodeFilterTerm).episodeSearchRoute);
		setCurrentPage(1);
	}, [episodeFilterTerm]);

	const handleClose = () => {
		setOpenModal(false);
	};
	const episodeData = Object.entries(selectedEpisode);

	if (!episodesFetched) {
		return null;
	}

	return (
		<>
			<SearchBar filter={(val) => setEpisodeFilterTerm(val)} />
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
				: "Oopss....theres some problem, Morty"}
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
				pageCount={episodesFetched.info.pages}
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
