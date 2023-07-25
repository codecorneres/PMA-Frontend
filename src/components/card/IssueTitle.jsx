import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProject, updateIssue } from "../../actions/board";
import { TextField } from "@material-ui/core";

const IssueTitle = ({ currIssue }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(currIssue.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(currIssue.title);
  }, [currIssue.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateIssue(currIssue.id, { ...currIssue, title }));
    setEditing(false);

    // setTimeout(() => {
    //   dispatch(getProject(currIssue.project_id));
    //   dispatch(updateIssue(currIssue.id));
    // }, 50);
  };

  return !editing ? (
    <h2 className=" issueTitle" onClick={() => setEditing(true)}>
      {currIssue.title}
    </h2>
  ) : (
    <form className="board-title-form " onSubmit={(e) => onSubmit(e)}>
      <TextField
        variant="outlined"
        required
        value={title}
        size="small"
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit(e)}
      />
    </form>
  );
};

export default IssueTitle;
