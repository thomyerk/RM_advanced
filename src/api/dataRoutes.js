export const mainUrls = (page, searchTerm) => {
	return {
		episodeSearchRoute: `https://rickandmortyapi.com/api/episode/?page=${page}${
			searchTerm ? `&name=${searchTerm}` : ""
		}`,
		locationSearchRoute: `https://rickandmortyapi.com/api/location/?page=${page}${
			searchTerm ? `&name=${searchTerm}` : ""
		}`,
		characterSearchRoute: `https://rickandmortyapi.com/api/character/?page=${page}${
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

		episodes: `https://rickandmortyapi.com/api/episode/?page=${page}${
			searchTerm ? `&name=${searchTerm}` : ""
		}`,
		locations: `https://rickandmortyapi.com/api/location/?page=${page}${
			searchTerm ? `&name=${searchTerm}` : ""
		}`,
		characters: `https://rickandmortyapi.com/api/character/?page=${page}${
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
