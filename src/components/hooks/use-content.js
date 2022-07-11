import { useState, useEffect } from "react";
import useFetch from "../../api/useFetch";
import { mainUrls } from "../../api/dataRoutes";
import { useQueryParams } from "hookrouter";
import useDebounce from "./use-debounce";

const useContent = (history, setHistory, contentType) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("");
	const [queryParams] = useQueryParams();
	const [nameFilter, setNameFilter] = useState(queryParams.name);
	// filter object for advanced filtering of characters
	const [filterObject, setFilterObject] = useState({
		name: nameFilter,
		gender: "",
		type: "",
		status: "",
		species: "",
	});

	console.log("contentType", mainUrls()[contentType]);

	// clear character name filter after clearing query params

	useEffect(() => {
		if (!queryParams.name) {
			setNameFilter("");
		}
	}, [queryParams]);

	// pager and fetch data according to selected page number, fetching happens through custom hook useFetch, and managed by giving it the right url
	const handlePageClick = (e) => {
		setUrl(mainUrls(e.selected + 1, filterObject).contentType);
		setCurrentPage(e.selected + 1);
		window.scrollTo(0, 0);
	};

	// debounce and loading indicator handling

	const debouncedTerm = useDebounce(nameFilter);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setCurrentPage(1);
		handleFilter();
		setLoading(false);
	}, [debouncedTerm]);

	useEffect(() => {
		setFilterObject({ ...filterObject, name: nameFilter });
		if (nameFilter !== debouncedTerm) {
			setLoading(true);
		}
	}, [nameFilter]);

	// this is the basic data fetching when the component mounted, setUrl used when filters changed

	const [contentFetched, setUrl] = useFetch(
		mainUrls(currentPage, filterObject).contentType
	);

	// filtering itself happens here
	const handleFilter = () => {
		setCurrentPage(1);
		setUrl(mainUrls(1, filterObject).contentType);
	};

	// modal open and close

	const handleOpen = (target) => {
		setSelectedItem(
			contentFetched.results.find((x) => x.id === parseInt(target))
		);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// set selected character for the modal, and save it to history
	useEffect(() => {
		if (selectedItem !== "") {
			setHistory([...history, selectedItem.name]);
		}
	}, [selectedItem]);

	// data for modal about the selected character
	const modalData = Object.entries(selectedItem);

	return {
		setNameFilter,
		filterObject,
		setFilterObject,
		contentFetched,
		handleFilter,
		modalData,
		handleClose,
		handlePageClick,
		loading,
		handleOpen,
		currentPage,
		open,
		nameFilter,
	};
};

export default useContent;
