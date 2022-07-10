import { useState } from 'react'

const Blog = ({ blog, like, remove }) => {
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
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleExtraView}>{viewExtraInfo ? 'hide' : 'view'}</button>
      {
        viewExtraInfo && <div>
          <div data-testid="url">{blog.url}</div>
          <div data-testid="likes">likes {blog.likes} <button id="like" onClick={() => like(blog)}>like</button></div>
          <div>{blog.user.name}</div>
          <button id="remove" onClick={() => remove(blog)}>remove</button>
        </div>
      }
    </div>
  )
}

export default Blog
