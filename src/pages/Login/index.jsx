import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginData, userDetails } from '../../store/slices/UserSlice';

function Login() {
  let loginDetails = useSelector((state) => {
    return state.users.loginUser;
  });

  let dispatch = useDispatch();

  const loginHandler = async () => {
    let options = {
      url: `${process.env.REACT_APP_API_URL}/user/login`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: loginDetails,
    };
    if (loginDetails.email) {
      try {
        let fetchResponse = await axios(options);
        console.log(fetchResponse);
        alert(fetchResponse.data.message);
        dispatch(userDetails(fetchResponse.data.user));
        localStorage.setItem(
          'userLoginData',
          JSON.stringify(fetchResponse.data)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please enter the login credentials');
    }
  };

  const googleAuth = (event) => {
    event.preventDefault();
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
        alignItems: 'center',
        backgroundColor: '#000000',
        height: '100vh',
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
        <h1>Log in Form</h1>
        <h2>Members Log in</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            dispatch(loginData({ ...loginDetails, email: e.target.value }));
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            dispatch(loginData({ ...loginDetails, password: e.target.value }));
          }}
        />
        <button
          onClick={loginHandler}
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
          Log In
        </button>
        <p>OR</p>
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
          Sign in with Google
        </button>
        <p>
          New Here ? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
