import { useState, useEffect } from "react"

const getLocalStorage = (key, defaultValue) => {
	if (typeof window !== "undefined") {
		const saved = localStorage.getItem(key)
		const init = saved !== null ? JSON.parse(saved) : defaultValue
		return init
	}
}

const useLocalStorage = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		return getLocalStorage(key, defaultValue)
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

export default useLocalStorage
