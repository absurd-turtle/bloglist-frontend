import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Togglable'
import "./main.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const loginFormRef = useRef()
  const blogFormRef = useRef()

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
      loginFormRef.current.toggleVisibility()
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

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      {
        user && (
          <div>
            {user.name} logged in 
            <button onClick={() => logout()} > logout</button >
          </div>
        )
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createBlog = async (blog) => {
    try {
      blogService.create(blog)
      createSuccessNotification('a new blog ' + blog.title + ' by ' + blog.author + ' added')
      blogFormRef.current.toggleVisibility()
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
        <Toggleable buttonLabel='login' ref={loginFormRef}>
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={ ({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Toggleable>
      </div >
    )
      : (
        <div>
          {
            blogView()
          }
          <Toggleable buttonLabel='new blog' ref={blogFormRef}>
            < BlogForm createBlog={createBlog} />
          </Toggleable>
        </div >
      )}

  </div>
}

export default App
