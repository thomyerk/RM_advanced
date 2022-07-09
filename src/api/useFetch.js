import { useState, useEffect } from "react";
import { navigate } from "hookrouter";

/**
     Fetch data from the given url. If it can't get any data from the url, than it writes a message into the console.
     *
     * @param initUrl string that gives the route that the function fetch data from.
     */
export const useFetch = (initUrl) => {
	const [url, setUrl] = useState(initUrl);
	const [data, setData] = useState(undefined);

	useEffect(() => {
		fetch(url)
			.then((response) => {
				if (response.status !== 200) return response.status;
				return response.json();
			})
			.then((json) => setData(json))
			.catch((err) => console.log("There was an error:", err));
	}, [url]);

	return [data, setUrl];
};

export default useFetch;
