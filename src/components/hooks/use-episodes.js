import { useState, useEffect } from "react";
import useFetch from "../../api/useFetch";
import { mainUrls } from "../../api/dataRoutes";
import useDebounce from "./use-debounce";

const useEpisodes = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [selectedEpisode, setSelectedEpisode] = useState("");
	const [episodeFilterTerm, setEpisodeFilterTerm] = useState(null);
	const [episodesFetched, setUrl] = useFetch(mainUrls(1).episodeSearchRoute);

	const handleOpen = (target) => {
		setSelectedEpisode(
			episodesFetched.results.find((x) => x.id === parseInt(target))
		);
		setOpenModal(true);
	};

	const handleClose = () => {
		setOpenModal(false);
	};

	const handlePageClick = (e) => {
		setUrl(mainUrls(e.selected + 1, episodeFilterTerm).episodeSearchRoute);
		setCurrentPage(e.selected + 1);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		setUrl(mainUrls(1, episodeFilterTerm).episodeSearchRoute);
		setCurrentPage(1);
	}, [episodeFilterTerm]);

	// debounce and loading

	const debouncedTerm = useDebounce(episodeFilterTerm);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setUrl(mainUrls(1, episodeFilterTerm).episodeSearchRoute);
		setCurrentPage(1);
		setLoading(false);
	}, [debouncedTerm]);

	useEffect(() => {
		if (episodeFilterTerm !== debouncedTerm) {
			setLoading(true);
		}
	}, [episodeFilterTerm]);

	const episodeData = Object.entries(selectedEpisode);
	return {
		episodeData,
		handleClose,
		episodeFilterTerm,
		handlePageClick,
		handleOpen,
		episodesFetched,
		openModal,
		setEpisodeFilterTerm,
		currentPage,
		loading,
		selectedEpisode,
	};
};

export default useEpisodes;
