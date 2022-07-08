import React, { useState, useEffect } from "react";

const useDebounce = (value) => {
	const [debounced, setDebounced] = useState(value);
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounced(value);
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, [value]);

	return debounced;
};

export default useDebounce;
