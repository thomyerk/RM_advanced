import React from "react";

const History = ({ history }) => {
	return (
		<>
			{history && history.length > 0 && (
				<div id="history-container">
					<h3>Previosuly seen</h3>
					{history.map((h) => (
						<div>{h}</div>
					))}
				</div>
			)}
		</>
	);
};

export default History;
