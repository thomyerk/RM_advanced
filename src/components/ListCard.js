import React from "react";

const ListCard = ({ listItem, type, handleOpen }) => {
	return (
		<div
			key={listItem.id}
			id={listItem.id}
			onClick={(ev) => handleOpen(ev.target.id)}
			className={`listCard ${type}`}>
			<h1 id={listItem.id}>{listItem.name}</h1>
			<p id={listItem.id}>{listItem.type}</p>
		</div>
	);
};

export default ListCard;
