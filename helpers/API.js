
const LIMIT = "10"
const URL = "https://transiscope.gogocarto.fr/api/elements"


export const getElements = async (limit = LIMIT)=> {
    const uri = `${URL}?limit=${limit}`
    const res = await fetch(uri)
    const jsonObj = await res.json()
    const { data } = jsonObj
    return data
}

const generateBoundsJson = (lat1,lng1,lat2,lng2)=>{
  return JSON.stringify([{ "_southWest": { "lat": lat1, "lng": lng1 }, "_northEast": { "lat": lat2, "lng": lng2} }])
}

export const getElementsByPoints  = async (lat1, lng1, lat2, lng2) => {
  const uri = `${URL}`
  const bounds = encodeURIComponent(`${lng1},${lat1},${lng2},${lat2};`)
  const formData = `bounds=${bounds}&boundsJson=${generateBoundsJson(lat1,lng1,lat2,lng2)}&categories=&fullRepresentation=false&ontology=gogocompact`
  const options = {
    method: 'POST',
    headers:new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }),
    body: formData,
    }

  const res = await fetch(uri,options)
  const jsonObj = await res.json()
  const { data } = jsonObj
  return data
}
