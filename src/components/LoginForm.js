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
    <button type="submit">login</button>
  </form>
)

export default LoginForm
