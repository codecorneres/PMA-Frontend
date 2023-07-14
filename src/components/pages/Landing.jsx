import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
// import { Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    document.title = 'CodeCorners PMA';
  }, []);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <nav className='top'>
        <h2>CodeCorners PMA</h2>
        <div>
          <Button color='inherit' href='/login'>
            Login
          </Button>
          <Button variant='contained' href='/register'>
            Sign Up
          </Button>
        </div>
      </nav>
      <div className='landing-inner'>
        <h1>CodeCorners PMA</h1>
        <p>
          Welcome to CodeCorners, your one stop for Task management and Updates...
        </p>
        <div className='buttons'>
          <Button variant='outlined' color='inherit' href='/register'>
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
