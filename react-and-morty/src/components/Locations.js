import React from "react"

import ReactPaginate from "react-paginate"

export default function Locations(props) {
	const locationsFetched = props.locations.results
	const pages = props.locations.info.pages
	return (
		<div>
			{locationsFetched.map((location) => (
				<div key={location.id} className="locationCard">
					<h3>{location.name}</h3>

					<p>{location.type}</p>
				</div>
			))}
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
		</div>
	)
}
