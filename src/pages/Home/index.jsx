function Home(userDetails) {
  const user = userDetails.user;
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, '_self');
    localStorage.removeItem('userData');
    localStorage.removeItem('userLoginData');
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
        <h1>Home</h1>
        <h2>Profile</h2>
        <p>
          Welcome!!! <span style={{ fontWeight: '700' }}>{user.name}</span>
        </p>
        <p>
          You have logged in using &nbsp;
          <span style={{ fontWeight: '700' }}>{user.email}</span>
        </p>

        <button
          onClick={logout}
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
          Log Out
        </button>
        <p>Thank you!</p>
      </div>
    </div>
  );
}

export default Home;
