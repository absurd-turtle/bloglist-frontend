import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async newObject => {
  console.log("create", newObject)
  const config = {
    headers: { Authorization: token }
  }
  console.log(config)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (blog) => {
  console.log("like", blog)
  const config = {
    headers: { Authorization: token }
  }
  const newBlog = {
    ...blog,
    likes: blog.likes+1
  }
  const response = await axios.put(baseUrl + "/" + newBlog.id, newBlog, config)
  return response.data
}

const blogService = { getAll, create, setToken, like }
export default blogService
