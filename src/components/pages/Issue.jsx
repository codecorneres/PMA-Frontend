import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { addComment, getIssue } from "../../actions/board";
import { updateIssue } from "../../actions/board";
import { CircularProgress, Box } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import IssueTitle from "../card/IssueTitle";
import Navbar from "../other/Navbar";
import { useParams } from "react-router-dom";
import useStyles from "../../utils/modalStyles";
import DeleteCard from "../card/DeleteCard";
import TextEditor from "../other/TextEditor";
import CommentCard from "../comment/CommentCard";
import TimesheetCard from "../Timesheet/TimesheetCard";

const Issue = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const currentIssue = useSelector((state) => state?.board?.issue);
  const [title, setTitle] = useState(currentIssue?.title);
  const [description, setDescription] = useState(
    currentIssue?.description || ""
  );
  const [comments, setComments] = useState(currentIssue?.Comments || "");
  const [singleComment, setSingleComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [onCommentAdding, setonCommentAdding] = useState(false);

  let checkAuth = localStorage.getItem("token");

  useEffect(() => {
    setTitle(currentIssue?.title);
    setComments(currentIssue?.Comments);
    setDescription(currentIssue?.description);
  }, [currentIssue]);

  useEffect(() => {
    dispatch(getIssue(id));
  }, []);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateIssue(currentIssue?.id, { title }));
  };

  const onCommentSubmit = async () => {
    dispatch(
      addComment({
        body: singleComment,
        issue_id: Number(id),
        project_id: currentIssue.project_id,
      })
    );
    setTimeout(() => {
      dispatch(getIssue(currentIssue.id));
    }, 50);
  };

  useEffect(() => {
    if (currentIssue?.title)
      document.title = currentIssue.title + " | CodeCorners PMA";
  }, [currentIssue?.title]);

  if (!checkAuth) {
    return <Navigate to="/" />;
  }

  const handleClick = (e) => {
    setEditing(true);
  };
  console.log(currentIssue, "the issue we need");

  return !currentIssue ? (
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
            <IssueTitle currIssue={currentIssue} />
          </div>
        </div>

        <div
          className={`${classes.paper} ${classes.issueModal}`}
          style={{ marginTop: "100px", maxHeight: "750px" }}
        >
          <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
            <div
              className={classes.modalTop}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3 style={{ marginBottom: "-25px" }} className="issueTitle">
                Issue: {title}
              </h3>
            </div>

            {editing ? (
              <TextEditor
                descriptionBody={description}
                editing={editing}
                setEditing={setEditing}
                issue={currentIssue}
              />
            ) : (
              // Add textbox for editing description
              <div
                style={{
                  height: "200px",
                  width: "715px",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  marginTop: "35px",
                  padding: "15px",
                  justifyContent: "center",
                }}
                onClick={handleClick}
              >
                {description}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column" }}>
              {!onCommentAdding ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "30px", marginBottom: "10px" }}
                  className={classes.button}
                  onClick={() => setonCommentAdding(true)}
                >
                  Add Comment
                </Button>
              ) : (
                <div>
                  <TextField
                    style={{ marginTop: "30px", marginBottom: "10px" }}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    multiline
                    label="Add Comment"
                    value={singleComment}
                    onChange={(e) => setSingleComment(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      setonCommentAdding(false);
                      onCommentSubmit();
                      setSingleComment("");
                    }}
                    style={{ marginBottom: "10px" }}
                  >
                    Comment
                  </Button>
                </div>
              )}

              {comments?.map((comment) => {
                return (
                  <div key={comment.id} style={{ marginTop: "10px" }}>
                    <CommentCard
                      commentId={comment.id}
                      comment={comment}
                      issueId={currentIssue.id}
                    />
                  </div>
                );
              })}

              <div className="cards">
                <TimesheetCard
                  key={currentIssue?.id}
                  issueId={currentIssue?.id}
                />
              </div>
            </div>
          </form>
          <div className={classes.modalSection}>
            <div className={classes.modalBottomRight}>
              <DeleteCard
                issueId={currentIssue?.id}
                project_id={currentIssue.project_id}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Issue;
