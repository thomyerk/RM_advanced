export const mainUrls = (page, searchTerm, contentType) => {
	return {
		filterRoute: `https://rickandmortyapi.com/api/${contentType}/?page=${page}${
			searchTerm && searchTerm.gender !== ""
				? `&gender=${searchTerm.gender}`
				: ""
		}${
			searchTerm && searchTerm.name && searchTerm.name !== ""
				? `&name=${searchTerm.name}`
				: ""
		}${searchTerm && searchTerm.type !== "" ? `&type=${searchTerm.type}` : ""}${
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
