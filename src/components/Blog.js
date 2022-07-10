import { useState } from 'react'

const Blog = ({ blog, like }) => {
  const [viewExtraInfo, setViewExtraInfo] = useState(false)
  
  const toggleExtraView = () => {
    setViewExtraInfo(!viewExtraInfo)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleExtraView}>{viewExtraInfo ? "hide" : "view"}</button>
      {
        viewExtraInfo && <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={() => like(blog)}>like</button></div>
        </div>
      }
    </div>
  )
}

export default Blog
