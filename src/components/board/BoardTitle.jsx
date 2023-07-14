import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { updateProject } from "../../actions/board";
import { TextField } from "@material-ui/core";
import { getProject } from "../../actions/board";
import { useSelector } from "react-redux";

const BoardTitle = ({ board }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const project = useSelector((state) => state.board.project);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProject(board.id, title));
    setEditing(false);
  };

  return !editing ? (
    <h2 className="board-title" onClick={() => setEditing(true)}>
      {project.title}
    </h2>
  ) : (
    <form className="board-title-form" onSubmit={(e) => onSubmit(e)}>
      <TextField
        variant="outlined"
        required
        value={title}
        size="small"
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

BoardTitle.propTypes = {
  board: PropTypes.object.isRequired,
};

export default BoardTitle;
