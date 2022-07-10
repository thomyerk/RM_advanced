import { useState, useEffect } from "react";
import useFetch from "../../api/useFetch";
import { mainUrls } from "../../api/dataRoutes";
import { useQueryParams } from "hookrouter";
import useDebounce from "./use-debounce";

const useCharacters = (history, setHistory) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [open, setOpen] = useState(false);
	const [selectedCharacter, setSelectedCharacter] = useState("");
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

	// clear character name filter after clearing query params

	useEffect(() => {
		if (!queryParams.name) {
			setNameFilter("");
		}
	}, [queryParams]);

	// pager and fetch data according to selected page number, fetching happens through custom hook useFetch, and managed by giving it the right url
	const handlePageClick = (e) => {
		setUrl(mainUrls(e.selected + 1, filterObject).characterSearchRoute);
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

	const [charactersFetched, setUrl] = useFetch(
		mainUrls(currentPage, filterObject).characterSearchRoute
	);

	// filtering itself happens here
	const handleFilter = () => {
		setCurrentPage(1);
		setUrl(mainUrls(1, filterObject).characterSearchRoute);
	};

	// modal open and close

	const handleOpen = (target) => {
		setSelectedCharacter(
			charactersFetched.results.find((x) => x.id === parseInt(target))
		);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// set selected character for the modal, and save it to history
	useEffect(() => {
		if (selectedCharacter !== "") {
			setHistory([...history, selectedCharacter.name]);
		}
	}, [selectedCharacter]);

	// data for modal about the selected character
	const characterData = Object.entries(selectedCharacter);

	return {
		setNameFilter,
		filterObject,
		setFilterObject,
		charactersFetched,
		handleFilter,
		characterData,
		handleClose,
		handlePageClick,
		loading,
		handleOpen,
		currentPage,
		open,
		nameFilter,
	};
};

export default useCharacters;
