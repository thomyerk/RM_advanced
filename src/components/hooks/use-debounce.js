import { useState, useEffect } from "react";

const useDebounce = (value) => {
	// basically returns the input value after 300 ms
	const [debounced, setDebounced] = useState(value);
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounced(value);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [value]);

	return debounced;
};

export default useDebounce;
