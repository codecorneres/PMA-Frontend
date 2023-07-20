import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { updateIssue } from "../../actions/board";
import { TextField } from "@material-ui/core";
import { getIssue } from "../../actions/board";
import { useSelector } from "react-redux";

const IssueTitle = ({ currIssue }) => {
  const issue = useSelector((state) => state.board.issue);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(currIssue.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(currIssue.title);
  }, [currIssue.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateIssue(currIssue.id, { ...issue, title }));
    setEditing(false);
  };

  return !editing ? (
    <h2 className="board-title" onClick={() => setEditing(true)}>
      {currIssue.title}
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

export default IssueTitle;
