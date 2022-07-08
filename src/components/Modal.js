import React from "react";
import Modal from "@material-ui/core/Modal";

export default function UniversalModal({
	displayData,
	open,
	closeHandler,
	episodeCharacters,
}) {
	if (episodeCharacters) {
		console.log("episodeCharacters", episodeCharacters);

		const characterIds = episodeCharacters.map((c) => c.split("/")[5]);
		console.log(characterIds);
	}
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
