import PropTypes from 'prop-types'

const LoginForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={props.username}
        onChange={props.handleUsernameChange}
      />
    </div>
    <div>
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={props.password}
        onChange={props.handlePasswordChange}
      />
    </div>
    <button id="loginButton" type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
