import React, { useState, useEffect } from "react"

const History = () => {
	const [history, setHistory] = useState()

	useEffect(() => {
		const data = window.localStorage.getItem("history")
		if (data) {
			setHistory(JSON.parse(data))
		}
	}, [])
	console.log("page h", history)

	return <div>History</div>
}

export default History
