import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { getProjects } from '../../actions/board';
import CreateBoard from '../other/CreateBoard';
import Navbar from '../other/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const boards = useSelector((state) => state?.board?.projects);
  const loading = useSelector((state) => state?.board?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    document.title = 'Your Boards | CodeCorners PMA';
  }, []);

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <div className='dashboard-and-navbar'>
      <Navbar />
      <section className='dashboard'>
        {/* <h1>Welcome {user && user.name}</h1> */}
        <h1>Welcome User</h1>
        <h2>Your Boards</h2>
        {loading && <CircularProgress className='dashboard-loading' />}
        <div className='boards'>
          {boards?.map((board) => (
            <Link key={board.id} to={`/board/${board.id}`} className='board-card'>
              {board.title}
            </Link>
          ))}
          <CreateBoard />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;