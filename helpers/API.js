const LIMIT = "10"
const URL = "https://transiscope.gogocarto.fr/api/elements.json"


export const getElements = async (limit = LIMIT)=> {
    const uri = `${URL}?limit=${limit}`
    const res = await fetch(uri)
    const jsonObj = await res.json()
    const { data } = jsonObj
    return data
}


export const getElementsByPoints  = async (lat1, lng1, lat2, lng2) => {
  const uri = `${URL}`
const options = {
  method: 'POST',
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: queryString.stringify({bounds:`${lng1},${lat1},${lng2},${lat2}`})
  }

  const res = await fetch(uri, options)
  return data
}
