import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getLists, getProjects } from "../../actions/board";
import CreateProject from "../other/CreateProject";
import Navbar from "../other/Navbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const projects = useSelector((state) => state?.board?.projects);
  const loading = useSelector((state) => state?.board?.loading);
  const dispatch = useDispatch();

  let checkAuth = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Your Projects | CodeCorners PMA";
  }, []);

  if (!checkAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="dashboard-and-navbar">
      <Navbar />
      <section className="dashboard">
        <h1>
          Welcome{" "}
          {user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
        </h1>
        <h2>Your projects</h2>
        {loading && <CircularProgress className="dashboard-loading" />}
        <div className="boards">
          {projects?.map((project) => (
            <Link
              key={project.id}
              to={`/board/${project.id}`}
              className="board-card"
            >
              {project.title}
            </Link>
          ))}
          <CreateProject />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
