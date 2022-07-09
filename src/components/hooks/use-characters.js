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
	const [filterObject, setFilterObject] = useState({
		name: nameFilter,
		gender: "",
		type: "",
		status: "",
		species: "",
	});

	// pager and fetch data according to selected page number
	const handlePageClick = (e) => {
		setUrl(mainUrls(e.selected + 1, filterObject).filterSearch);
		setCurrentPage(e.selected + 1);
		window.scrollTo(0, 0);
	};

	// debounce and loading

	const debouncedTerm = useDebounce(nameFilter);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		handleFilter();
		setLoading(false);
	}, [debouncedTerm]);

	useEffect(() => {
		setFilterObject({ ...filterObject, name: nameFilter });
		if (nameFilter !== debouncedTerm) {
			setLoading(true);
		}
	}, [nameFilter]);

	// basic and filter url setting, and fetching the data

	const [charactersFetched, setUrl] = useFetch(
		mainUrls(currentPage, filterObject).filterSearch
	);

	const handleFilter = () => {
		setCurrentPage(1);
		setUrl(mainUrls(currentPage, filterObject).filterSearch);
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

	// selected character for the modal
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
	};
};

export default useCharacters;
