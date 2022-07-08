export const mainUrls = (page, searchTerm) => {
	console.log("searchTerm", searchTerm);
	return {
		characters: `https://rickandmortyapi.com/api/character/?page=${page}`,
		locations: `https://rickandmortyapi.com/api/location/?page=${page}`,
		characterSearchRoute: `https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}`,
		locationSearchRoute: `https://rickandmortyapi.com/api/character/?location=${searchTerm}&page=${page}`,
		filterSearch: `https://rickandmortyapi.com/api/character/?page=${page}${
			searchTerm && searchTerm.gender !== ""
				? `&gender=${searchTerm.gender}`
				: ""
		}${searchTerm && searchTerm.name !== "" ? `&name=${searchTerm.name}` : ""}${
			searchTerm && searchTerm.type !== "" ? `&type=${searchTerm.type}` : ""
		}${
			searchTerm && searchTerm.species !== ""
				? `&species=${searchTerm.species}`
				: ""
		}${
			searchTerm && searchTerm.status !== ""
				? `&status=${searchTerm.status}`
				: ""
		}`,
	};
};
