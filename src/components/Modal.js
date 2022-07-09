import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";

export default function UniversalModal({
	displayData,
	open,
	closeHandler,
	episodeCharacters,
}) {
	const [characters, setCharacters] = useState();
	const fetchCharacters = async (characterIdArray) => {
		try {
			const resp = await fetch(
				`https://rickandmortyapi.com/api/character/${characterIdArray}`
			);
			if (resp.status !== 200) {
				throw new Error(`Character fetching problem status: ${resp.status}`);
			}
			const data = resp.json();
			return data;
		} catch (error) {
			console.log("There was an error:", error);
		}
	};

	useEffect(() => {
		if (episodeCharacters) {
			const characterIds = episodeCharacters.map((c) => c.split("/")[5]);
			fetchCharacters(characterIds).then((result) => setCharacters(result));
		}
	}, [episodeCharacters]);

	const body = (
		<div className="popUpCard">
			{displayData.map((elem, index) => {
				if (
					(typeof elem[1] === "string" || typeof elem[1] === "number") &&
					elem[1] !== ""
				)
					return (
						<p key={index}>
							{elem[0]}: <span className="popUpData">{elem[1]}</span>
						</p>
					);
				return null;
			})}
			{characters && (
				<div id="character-container">
					{characters.map((c) => (
						<a key={c.name} href={c.url}>
							<img src={c.image} alt={c.name} className="episode-character" />
						</a>
					))}
				</div>
			)}
		</div>
	);

	return (
		<div>
			<Modal
				open={open}
				onClose={closeHandler}
				className="modal"
				data={displayData}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description">
				{body}
			</Modal>
		</div>
	);
}
