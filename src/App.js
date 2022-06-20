import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import "./main.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log(blogs)
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createErrorNotification = (message) => {
    setErrorMessage(message)
    setTimeout(
      () => { setErrorMessage(null) }, 5000
    )
  }

  const createSuccessNotification = (message) => {
    setSuccessMessage(message)
    setTimeout(
      () => { setSuccessMessage(null) }, 5000
    )
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log("logging in with", username)
    try {
      const user = await loginService.login(
        { username, password, }
      )
      console.log(user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("login failed")
      createErrorNotification('Wrong credentials')
    }
  }

  const logout = () => {
    window.localStorage.removeItem(
      'loggedBlogappUser'
    )
    setUser(null)
    blogService.setToken(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      {user && (<p>{user.name} logged in</p>)}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const handleCreate = event => async (blog) => {
    event.preventDefault()
    try {
      blogService.create(blog)
      createSuccessNotification('a new blog ' + blog.title + ' by ' + blog.author + ' added')
    }
    catch (exception) {
      createErrorNotification('something went wrong')
    }
  }


  return <div>
    {successMessage && <Notification message={successMessage} type="success" />}
    {errorMessage && <Notification message={errorMessage} type="error" />}
    {(user === null) ? (
      <div>
        <h2>log in</h2 >
        {loginForm()}
      </div >
    )
      : (
        <div>
          {
            blogView()
          }
          < BlogForm handleCreate={handleCreate} />
          <button onClick={() => logout()} > logout</button >
        </div >
      )}

  </div>
}

export default App
