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
<<<<<<< HEAD
export const useCharacters = (pageNum = 1, filteredCharacter) => {
	console.log("usechar happened")

	const [characters, setUrl] = useFetch(mainUrls(pageNum).characters)

=======
export const useCharacters = (pageNum = 1) => {
	const [characters, setUrl] = useFetch(mainUrls(pageNum).characters)
>>>>>>> efcc54491a89ae4e8d27ccd5200ce1ee4159aab2
	useEffect(() => {
		setUrl(mainUrls(pageNum).characters)
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
<<<<<<< HEAD
export const useLocations = (pageNum = 1, filteredLocation) => {
	console.log("useloc happened")

	const [locations, setUrl] = useFetch()
	useEffect(() => {
		setUrl(mainUrls(pageNum, filteredLocation).locationSearchRoute)
	}, [filteredLocation])
	useEffect(() => {
		setUrl(mainUrls(pageNum, filteredLocation).locationSearchRoute)
=======
export const useLocations = (pageNum = 1) => {
	const [locations, setUrl] = useFetch(mainUrls(pageNum).locations)
	useEffect(() => {
		setUrl(mainUrls(pageNum).locations)
	}, [pageNum])
	return locations === undefined ? "Loading..." : locations
}

export const useSearchForCharacter = (pageNum = 1, character) => {
	const [characters, setUrl] = useFetch(
		mainUrls(pageNum, character).characterSearchRoute
	)
	useEffect(() => {
		setUrl(mainUrls(pageNum, character))
	}, [pageNum])
	return characters === undefined ? "Loading..." : characters
}

export const useSearchForLocation = (pageNum = 1, location) => {
	const [locations, setUrl] = useFetch(
		mainUrls(pageNum, location).locationSearchRoute
	)
	useEffect(() => {
		setUrl(mainUrls(pageNum, location))
>>>>>>> efcc54491a89ae4e8d27ccd5200ce1ee4159aab2
	}, [pageNum])
	return locations === undefined ? "Loading..." : locations
}
