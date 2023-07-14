import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const signupHandler = async () => {
    console.log(details);
    let options = {
      url: `${process.env.REACT_APP_API_URL}/user/signup`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: details,
    };
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      '_self'
    );
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        backgroundColor: '#000000',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid grey',
          borderRadius: '10px',
          width: '30%',
          backgroundColor: '#ffffff',
          marginTop: '200px',
        }}
      >
        <h1>Sign up Form</h1>
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
        />
        <button
          onClick={signupHandler}
          style={{
            width: '80px',
            backgroundColor: 'gray',
            borderRadius: '5px',
            color: 'white',
            height: '30px',
            margin: 'auto',
            border: 'none',
          }}
        >
          Sign Up
        </button>
        <p>or</p>
        <button
          onClick={googleAuth}
          style={{
            width: '150px',
            backgroundColor: 'gray',
            borderRadius: '5px',
            color: 'white',
            margin: 'auto',
            height: '30px',
            border: 'none',
          }}
        >
          Sing up with Google
        </button>
        <p>
          Already Have Account ? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
