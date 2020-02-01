import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const login = event => {
    event.preventDefault()
    setLoading(true)

    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        setLoading(false)

        props.history.push('/bubblePage')
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <div>
      <form onSubmit={login}>
        <h1>Login</h1>
        <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        />
        <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
