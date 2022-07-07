import React, { useState, useEffect } from "react"
import UniversalModal from "./Modal"
import ReactPaginate from "react-paginate"
import SearchBar from "./SearchBar"
import useLocalStorage from "./assets/useLocalStorage"

export default function Locations(props) {
	const locationsFetched = props.locations.results
	const pages = props.locations.info.pages
	const [open, setOpen] = useState(false)
	const [actualLocation, setActualLocation] = useState("")
	const [history, setHistory] = useLocalStorage("history", [])

	const handleOpen = (target) => {
		setActualLocation(
			locationsFetched.find((x) => x.id === parseInt(target))
		)
		setOpen(true)
	}

	useEffect(() => {
		if (actualLocation !== "") {
			setHistory([...history, actualLocation.name])
		}
	}, [actualLocation])

	const handleClose = () => {
		setOpen(false)
	}
	const locationData = Object.entries(actualLocation)
	console.log("locationsFetched", locationsFetched)

	return (
		<>
			<SearchBar filter={props.filter} />
			{locationsFetched.map((location) => (
				<div
					key={location.id}
					id={location.id}
					onClick={(ev) => handleOpen(ev.target.id)}
					className="listCard location">
					<h1 id={location.id}>{location.name}</h1>
					<p id={location.id}>{location.type}</p>
				</div>
			))}
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
				pageCount={pages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={props.handlePageClick}
				containerClassName={"pagination"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
			/>
		</>
	)
}
