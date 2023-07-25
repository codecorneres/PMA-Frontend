import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getProject } from "../../actions/board";
import { CircularProgress, Box } from "@material-ui/core";
import BoardTitle from "../board/BoardTitle";
import List from "../list/List";
import CreateList from "../board/CreateList";
import Navbar from "../other/Navbar";
import { useParams } from "react-router-dom";

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let checkAuth = localStorage.getItem("token");
  const project = useSelector((state) => state?.board?.project);
  const currentLists = project?.lists;

  const getAllIssues = () => {
    console.log("gettings all lists", id);
    dispatch(getProject(id));
  };
  useEffect(() => {
    getAllIssues();
  }, []);

  useEffect(() => {
    if (project?.title) document.title = project.title + " | CodeCorners PMA";
  }, [project?.title]);

  if (!checkAuth) {
    return <Navigate to="/" />;
  }

  // console.log(project, "Centralised data");
  return !project ? (
    <>
      <Navbar />
      <Box className="board-loading">
        <CircularProgress />
      </Box>
    </>
  ) : (
    <div
      className="board-and-navbar"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1598197748967-b4674cb3c266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80)",
      }}
    >
      <Navbar />
      <section className="board">
        <div className="board-top">
          <div className="board-top-left">
            <BoardTitle board={project} />
          </div>
        </div>
        <div className="lists">
          {currentLists?.map((listItem) => (
            <List key={listItem.id} list={listItem} />
          ))}
          <CreateList project={project} />
        </div>
      </section>
    </div>
  );
};

export default Board;
