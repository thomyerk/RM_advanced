import  { useState, useEffect } from "react";
import useFetch from "../../api/useFetch";
import { mainUrls } from "../../api/dataRoutes";
import useDebounce from "./use-debounce";

const useLocations = ({ history, setHistory }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [open, setOpen] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState("");
	const [locationFilter, setLocationFilter] = useState(null);
	const [locationsFetched, setUrl] = useFetch(mainUrls(1).locationSearchRoute);

	// handle paginator of the page and for the fetch
	const handlePageClick = (e) => {
		setUrl(mainUrls(e.selected + 1, locationFilter).locationSearchRoute);
		setCurrentPage(e.selected + 1);
		window.scrollTo(0, 0);
	};

	// set selected location

	useEffect(() => {
		if (selectedLocation !== "") {
			setHistory([...history, selectedLocation.name]);
		}
	}, [selectedLocation]);

	// modal open and close

	const handleOpen = (target) => {
		setSelectedLocation(
			locationsFetched.results.find((x) => x.id === parseInt(target))
		);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const locationData = Object.entries(selectedLocation);

	//  debouonce and loading

	const debouncedTerm = useDebounce(locationFilter);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setUrl(mainUrls(1, locationFilter).locationSearchRoute);
		setCurrentPage(1);
		setLoading(false);
	}, [debouncedTerm]);

	useEffect(() => {
		if (locationFilter !== debouncedTerm) {
			setLoading(true);
		}
	}, [locationFilter]);

	return {
		locationsFetched,
		setLocationFilter,
		handleOpen,
		locationData,
		open,
		handleClose,
		currentPage,
		handlePageClick,
		loading,
		locationFilter,
	};
};

export default useLocations;
