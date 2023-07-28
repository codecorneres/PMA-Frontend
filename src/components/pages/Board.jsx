import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getProject } from "../../actions/board";
import { CircularProgress, Box } from "@material-ui/core";
import BoardTitle from "../board/BoardTitle";
import CreateList from "../board/CreateList";
import Navbar from "../other/Navbar";
import { useParams } from "react-router-dom";
import { moveIssue, moveList } from "../../actions/board";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "../list/List";

const Board = () => {
  // the state will be multiple lists
  const { id } = useParams();
  const dispatch = useDispatch();
  let checkAuth = localStorage.getItem("token");
  const project = useSelector((state) => state?.board?.project);
  // const currentLists = project?.lists;

  const [addingCard, setAddingCard] = useState(false);
  const createCardFormRef = useRef(null);

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

  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  if (!checkAuth) {
    return <Navigate to="/" />;
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === "card") {
      dispatch(
        moveIssue(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

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

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="lists"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {project.lists.map((list, index) => (
                  <List key={list.id} list={list} index={index} />
                ))}
                {provided.placeholder}
                <CreateList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
};

export default Board;
