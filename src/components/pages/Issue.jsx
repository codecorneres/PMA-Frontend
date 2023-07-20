import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  addComment,
  getComments,
  getComment,
  getIssue,
} from "../../actions/board";
import { updateIssue } from "../../actions/board";
import { CircularProgress, Box } from "@material-ui/core";
import { Modal, TextField, Button } from "@material-ui/core";
import { TextareaAutosize } from "@mui/base";
import IssueTitle from "../card/IssueTitle";
import Navbar from "../other/Navbar";
import { useParams } from "react-router-dom";
import useStyles from "../../utils/modalStyles";
import DeleteCard from "../card/DeleteCard";
import TextEditor from "../other/TextEditor";
import CommentCard from "../comment/CommentCard";

const Issue = () => {
  const issue = useSelector((state) => state?.board?.issue);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();

  const [title, setTitle] = useState(issue?.title);
  const [description, setDescription] = useState(issue?.description || "");
  const [comments, setComments] = useState(issue?.Comments || "");
  const [singleComment, setSingleComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [onCommentAdding, setonCommentAdding] = useState(false);

  let checkAuth = localStorage.getItem("token");

  useEffect(() => {
    setTitle(issue?.title);
    setComments(issue?.Comments);
    setDescription(issue?.description);
  }, [issue]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateIssue(issue?.id, { title }));
  };

  const onCommentSubmit = async () => {
    // e.preventDefault();
    dispatch(
      addComment({
        body: singleComment,
        issue_id: Number(id),
        project_id: issue.project_id,
      })
    );
  };

  useEffect(() => {
    dispatch(getIssue(id));
    dispatch(getComments());
  }, [dispatch, id]);

  useEffect(() => {
    if (issue?.title) document.title = issue.title + " | CodeCorners PMA";
  }, [issue?.title]);

  if (!checkAuth) {
    return <Navigate to="/" />;
  }

  const handleClick = (e) => {
    setEditing(true);
  };

  // console.log(issue, "the whole project with lists and issues");
  // console.log(comments, "All the comments");
  // console.log(description, "description");
  // console.log(singleComment, "singlecomment ");

  return !issue ? (
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
            <IssueTitle currIssue={issue} />
          </div>
        </div>

        <div
          className={`${classes.paper} ${classes.issueModal}`}
          style={{ marginTop: "100px", maxHeight: "750px" }}
        >
          <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
            <div className={classes.modalTop}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                multiline
                label="Card title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && onTitleDescriptionSubmit(e)
                }
                className={classes.cardTitle}
              />
            </div>

            {editing ? (
              <TextEditor
                descriptionBody={description}
                editing={editing}
                setEditing={setEditing}
                issue={issue}
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
                    <CommentCard commentId={comment.id} />
                  </div>
                );
              })}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "50px" }}
                disabled={
                  title === issue?.title &&
                  (description === issue?.description ||
                    (description === "" && !issue?.description))
                }
                className={classes.button}
              >
                Save All Changes
              </Button>
            </div>
          </form>
          <div className={classes.modalSection}>
            <div className={classes.modalBottomRight}>
              <DeleteCard issueId={issue?.id} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Issue;
