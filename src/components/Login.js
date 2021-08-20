import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const credentials = {
  username: '',
  password: '',
}

 //replace with error state

const Login = () => {
  const { push } = useHistory();
  const [ login, setLogin ] = useState(credentials);
   //replace with error state
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.username !== 'Lambda' || credentials.password !== 'School') {
      setError('Username or Password not valid')
    }

    axios.post('http://localhost:5000/api/login', login)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      push('/bubbles');
    })
    .catch(err => {
      // console.log("Fix This!")
    })
  }

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Login to your account:</h2>
{/* FORM CONTAINS USERNAME & PASSWORD */}
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input 
            id='username'
            name='username'
            type='text'
            value={login.username}
            onChange={handleChange}
          />
          <label>Password</label>
          <input 
            id='password'
            name='password'
            type='password'
            value={login.password}
            onChange={handleChange}
          />
          <button id='submit'>Submit</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
// x 1. Build a form containing a username and password field.
// x 2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
// x 7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
// x 8. MAKE SURE YOUR ERROR p tag contains the id="error"