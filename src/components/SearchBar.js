import React, { useState, useEffect } from "react";
import useDebounce from "./helpers/use-debounce";
import LoadingSpinner from "./LoadingSpinner";

const SearchBar = ({ filter, value }) => {
	const [loading, setLoading] = useState(false);
	const [searchTerm, setsearchTerm] = useState("");

	const debouncedTerm = useDebounce(searchTerm);

	useEffect(() => {
		filter(debouncedTerm);
		setLoading(false);
	}, [debouncedTerm]);

	useEffect(() => {
		if (searchTerm !== debouncedTerm) {
			setLoading(true);
		}
	}, [searchTerm]);

	return (
		<>
			<div className="search-bar">
				<input
					onChange={(e) => setsearchTerm(e.currentTarget.value)}
					value={value}></input>
				{loading && <LoadingSpinner />}
			</div>
		</>
	);
};

export default SearchBar;
