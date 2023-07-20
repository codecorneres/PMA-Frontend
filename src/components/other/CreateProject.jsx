import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { withRouter } from 'react-router-dom';
import { addProject } from "../../actions/board";
import { Modal, TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../utils/modalStyles";

const CreateProject = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addProject({ title, owner_id: user?.id }));
    setTitle("");
  };

  // console.log(user, "bananana");

  const body = (
    <div className={`${classes.paper} ${classes.createBoardModal}`}>
      <div className={classes.modalTop}>
        <h1>Create new project</h1>
        <Button onClick={() => setOpen(false)}>
          <CloseIcon />
        </Button>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Add project title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Create Project
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <button
        className="board-card create-board-card"
        onClick={() => {
          setOpen(true);
          setTitle("");
        }}
      >
        Create new project
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {body}
      </Modal>
    </div>
  );
};

export default CreateProject;
