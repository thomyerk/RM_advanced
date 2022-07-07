import React, {  useEffect } from "react"

const SearchBar = ({filter, value}) => {
	useEffect(() => {
		console.log('mount');

	
		return () => {
			console.log('unmount');
		}
	}, [])
	
	return (
		<>
		<div className="search-bar">

			<input onChange={(e)=>filter(e.currentTarget.value)} value={value}></input>
		</div>

		</>
	)
}

export default SearchBar
