import React, { useState, useEffect } from "react";
import UniversalModal from "./Modal";
import ReactPaginate from "react-paginate";
import SearchBar from "./SearchBar";
import useFetch from "../api/useFetch";
import { mainUrls } from "../api/dataRoutes";

export default function Locations(props) {
	const [locationPages, setLocationPages] = useState(1);
	const [open, setOpen] = useState(false);
	const [actualLocation, setActualLocation] = useState("");
	const [locationFilter, setLocationFilter] = useState(null);
	const [locationsFetched, setUrl] = useFetch(mainUrls(1).locationSearchRoute);

	const handleOpen = (target) => {
		setActualLocation(
			locationsFetched.results.find((x) => x.id === parseInt(target))
		);
		setOpen(true);
	};

	const handlePageClick = (e) => {
		setUrl(mainUrls(e.selected + 1, locationFilter).locationSearchRoute);
		setLocationPages(e.selected + 1);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		console.log(mainUrls(1, locationFilter).locationSearchRoute);
		setUrl(mainUrls(1, locationFilter).locationSearchRoute);
		setLocationPages(1);
	}, [locationFilter]);

	useEffect(() => {
		if (actualLocation !== "") {
			props.setHistory([...props.history, actualLocation.name]);
		}
	}, [actualLocation]);

	const handleClose = () => {
		setOpen(false);
	};
	const locationData = Object.entries(actualLocation);
	if (!locationsFetched) {
		return null;
	}

	return (
		<>
			<SearchBar filter={(val) => setLocationFilter(val)} />
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
				: "Oopss....theres some problem, Morty"}
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
				pageCount={locationsFetched.info.pages}
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
