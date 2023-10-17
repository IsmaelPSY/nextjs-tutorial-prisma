export const fetchData = async (url) => {
	if (process.env.NODE_ENV === 'production') {
		return await fetchProductionData(url)
	} else {
		return await fetchDevelopmentData(url)
	}
}

const fetchProductionData = async (url) => {
  const res = await fetch(`${process.env.PRODUCTION_APP_URL}${url}`)
  const data = res.json()
	return data
}

const fetchDevelopmentData = async (url) => {
  const res = await fetch(`http://localhost:3000${url}`)
  const data = res.json()
	return data
}
