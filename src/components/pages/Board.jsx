import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getProject } from "../../actions/board";
import { getLists } from "../../actions/board";
import { CircularProgress, Box } from "@material-ui/core";
import BoardTitle from "../board/BoardTitle";
import List from "../list/List";
import CreateList from "../board/CreateList";
import Navbar from "../other/Navbar";
import { useParams } from "react-router-dom";

const Board = () => {
  const project = useSelector((state) => state?.board?.project);
  // const lists = useSelector((state) => state?.board?.lists);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const dispatch = useDispatch();
  const { id } = useParams();

  let checkAuth = localStorage.getItem("token");

  // console.log(id, "id of the project");
  // console.log(project, "the whole project with lists and issues");
  // console.log(lists, "lists in frontend, banana");

  useEffect(() => {
    dispatch(getProject(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  useEffect(() => {
    if (project?.title) document.title = project.title + " | CodeCorners PMA";
  }, [project?.title]);

  if (!checkAuth) {
    return <Navigate to="/" />;
  }

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
          {project?.lists?.map((listItem, index) => (
            <List key={listItem.id} listId={listItem.id} index={index} />
          ))}
          <CreateList />
        </div>
      </section>
    </div>
  );
};

export default Board;
