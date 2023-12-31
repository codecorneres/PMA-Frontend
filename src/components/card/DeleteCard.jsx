import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteIssue } from "../../actions/board";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { useNavigate } from "react-router-dom";
const DeleteCard = ({ issueId, project_id }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onDeleteCard = async () => {
    dispatch(deleteIssue(issueId));
    setOpenDialog(false);
    setTimeout(() => {
      navigate(`/board/${project_id}`);
    }, 50);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Delete Issue
      </Button>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{"Delete card?"}</DialogTitle>
        <DialogActions>
          <Button
            onClick={onDeleteCard}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteCard.propTypes = {
  issueId: PropTypes.number.isRequired,
};

export default DeleteCard;
