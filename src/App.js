import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from './store/slices/UserSlice';

function App() {
  let dispatch = useDispatch();
  let user = useSelector((state) => {
    return state.users.user;
  });

  let loginDetails = useSelector((state) => {
    return state.users.loginUser;
  });

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/user/login/google`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      dispatch(userDetails(data.user._json));
      localStorage.setItem('userData', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }

    console.log(loginDetails);
    let options = {
      url: `${process.env.REACT_APP_API_URL}/user/getUser/${loginDetails}`,
      method: 'get',
      headers: {
        'Content-type': 'application/json',
      },
    };
    console.log(user);
    try {
      let fetchResponse = await axios(options);
      console.log(fetchResponse);
      dispatch(userDetails(fetchResponse.data.user));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
