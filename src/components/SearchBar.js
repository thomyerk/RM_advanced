import React, { useState, useEffect } from "react";
import useDebounce from "./hooks/use-debounce";
import LoadingSpinner from "./LoadingSpinner";

const SearchBar = ({ returnWithDebounce, defval }) => {
	const [loading, setLoading] = useState(false);
	const [searchTerm, setsearchTerm] = useState(null);

	console.log("searchterm", searchTerm);

	const debouncedTerm = useDebounce(searchTerm);

	useEffect(() => {
		returnWithDebounce(debouncedTerm);
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
					defaultValue={defval}
					onChange={(e) => setsearchTerm(e.currentTarget.value)}></input>
				{loading && <LoadingSpinner />}
			</div>
		</>
	);
};

export default SearchBar;
