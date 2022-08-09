 const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

const postUrls = (url) => {
  return fetch('http://localhost:3001/api/v1/urls',{
    method:"POST",
    headers: {
      "Content-Type" :"application/json"
    },
    body:(JSON.stringify(url))
  })
    .then(response=>response.json())
}

export {getUrls, postUrls}