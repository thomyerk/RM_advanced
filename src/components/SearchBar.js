import React from "react"

const SearchBar = ({setSearch, value}) => {
	return (
		<>
		<div className="search-bar">

			<input onChange={(e)=>setSearch(e.currentTarget.value)} value={value}></input>
		</div>

		</>
	)
}

export default SearchBar
