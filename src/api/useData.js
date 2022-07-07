import { useEffect } from "react"
import { useFetch } from "./useFetch.js"
import { mainUrls } from "./dataRoutes.js"

/**
     Fetch data from an open-source API. It returns json containing pagination.
     The json contains an `info` and a `results` property. The `info` contains every information about the pagination,
     the `results` contains the characters objects situated in the given page number in the pagination.
     *
     * @param pageNum integer that gives the pagination page number. The json `info` property contains how many pages are.
     */
export const useCharacters = (pageNum = 1, filteredCharacter) => {
	console.log("usechar happened")

	const [characters, setUrl] = useFetch()
	useEffect(() => {
		setUrl(mainUrls(pageNum, filteredCharacter).characterSearchRoute)
	}, [filteredCharacter])
	useEffect(() => {
		setUrl(mainUrls(pageNum, filteredCharacter).characterSearchRoute)
	}, [pageNum])
	return characters === undefined ? "Loading..." : characters
}

/**
     Fetch data from an open-source API. It returns json containing pagination.
     The json contains an `info` and a `results` property. The `info` contains every information about the pagination,
     the `results` contains the locations objects situated in the given page number in the pagination.
     *
     * @param pageNum integer that gives the pagination page number. The json `info` property contains how many pages are.
     */
export const useLocations = (pageNum = 1, filteredLocation) => {
	console.log("useloc happened")

	const [locations, setUrl] = useFetch()
	useEffect(() => {
		setUrl(mainUrls(pageNum, filteredLocation).locationSearchRoute)
	}, [filteredLocation])
	useEffect(() => {
		setUrl(mainUrls(pageNum, filteredLocation).locationSearchRoute)
	}, [pageNum])
	return locations === undefined ? "Loading..." : locations
}
