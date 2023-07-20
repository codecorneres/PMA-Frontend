import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { updateProject, deleteProject } from "../../actions/board";
import { TextField } from "@material-ui/core";
import { getProject } from "../../actions/board";
import { useSelector } from "react-redux";
import { Button, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Navigate } from "react-router-dom";

const BoardTitle = ({ board }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const project = useSelector((state) => state?.board?.project);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteProject = () => {
    dispatch(deleteProject(board.id));
    handleClose();
    return <Navigate to="/dashboard" />;
  };

  const handleEditProjectName = () => {
    setEditing(true);
    handleClose();
  };

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProject(board.id, title));
    setEditing(false);
  };

  console.log(board.id, "the project to be deleted");

  return !editing ? (
    <div style={{ display: "flex", gap: "10px" }}>
      <h2 className="board-title" onClick={() => setEditing(true)}>
        {project.title}
      </h2>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <MoreHorizIcon />
        </MenuItem>
        <MenuItem onClick={handleEditProjectName}>Edit Name</MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteProject();
            handleClose();
          }}
        >
          Delete List
        </MenuItem>
      </Menu>
    </div>
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
