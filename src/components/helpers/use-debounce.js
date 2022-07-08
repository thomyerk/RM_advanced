import { useState, useEffect } from "react";

const useDebounce = (value) => {
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
