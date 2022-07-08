import React, { useState, useEffect } from "react";
import useDebounce from "./helpers/use-debounce";

const SearchBar = ({ filter, value }) => {
	const [loading, setLoading] = useState(false);
	const [searchTerm, setsearchTerm] = useState("");

	const debouncedTerm = useDebounce(searchTerm);

	useEffect(() => {
		setLoading(!loading);
		filter(debouncedTerm);
	}, [debouncedTerm]);

	return (
		<>
			<div className="search-bar">
				<input
					onChange={(e) => setsearchTerm(e.currentTarget.value)}
					value={value}></input>
				{loading ? "a" : "b"}
			</div>
		</>
	);
};

export default SearchBar;
