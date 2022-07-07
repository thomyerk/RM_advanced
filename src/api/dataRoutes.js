export const mainUrls = (page, searchTerm) => {
	return {
		characters: `https://rickandmortyapi.com/api/character/?page=${page}`,
		locations: `https://rickandmortyapi.com/api/location/?page=${page}`,
		characterSearchRoute: `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}`,
		locationSearchRoute: `https://rickandmortyapi.com/api/character/?location=${searchTerm}&page=${page}`,
	}
}
