import React from "react";

const History = ({ history }) => {
	const historyIcon = process.env.PUBLIC_URL + "/img/history-icon.png";

	return (
		<>
			{history && history.length > 0 && (
				<div className="history-container">
					<div className="history-items icon">
						<img src={historyIcon} alt="" />
					</div>
					<div className="history-items">
						<h3>Previosuly seen</h3>
						{history.map((h, i) => (
							<div key={i}>{h}</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};
export default History;
