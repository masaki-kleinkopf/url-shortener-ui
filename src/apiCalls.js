 const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
    .then(response=>{
      if (!response.ok) {
        throw Error(response.status)
      } else {
        return response.json()
      }
    })
}

const postUrls = (url) => {
  return fetch('http://localhost:3001/api/v1/urls',{
    method:"POST",
    headers: {
      "Content-Type" :"application/json"
    },
    body:(JSON.stringify(url))
  })
    .then(response=>{
      if (!response.ok) {
        throw Error(response.status)
      } else {
        return response.json()
      }
    })
}

const deleteUrls = (id) => {
  return fetch(`http://localhost:3001/api/v1/urls/${id}`,{
    method:"DELETE"
  })
}

export {getUrls, postUrls, deleteUrls}