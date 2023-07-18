// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import PropTypes from "prop-types";
// import { GithubPicker } from "react-color";
// import { updateIssue } from "../../actions/board";
// import { Modal, TextField, Button } from "@material-ui/core";
// import CloseIcon from "@material-ui/icons/Close";
// import DeleteCard from "../card/DeleteCard";
// import useStyles from "../../utils/modalStyles";

// const Issue = ({ issueId, open, setOpen, issue, list }) => {
//   const classes = useStyles();
//   const [title, setTitle] = useState(issue?.title);
//   const [description, setDescription] = useState(issue?.description || "");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setTitle(issue?.title);
//     setDescription(issue?.description);
//   }, [issue]);

//   const onTitleDescriptionSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(updateIssue(issueId, { title, description }));
//   };
//   console.log(issueId, open, setOpen, issue, list, "ttttt");

//   return (
//     <Modal open={open} onClose={() => setOpen(false)}>
// <div className={`${classes.paper} ${classes.issueModal}`}>
//   <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
//     <div className={classes.modalTop}>
//       <TextField
//         variant="outlined"
//         margin="normal"
//         required
//         fullWidth
//         multiline
//         label="Card title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         onKeyDown={(e) =>
//           e.key === "Enter" && onTitleDescriptionSubmit(e)
//         }
//         className={classes.cardTitle}
//       />
//       <Button onClick={() => setOpen(false)}>
//         <CloseIcon />
//       </Button>
//     </div>
//     <TextField
//       variant="outlined"
//       margin="normal"
//       fullWidth
//       multiline
//       label="Card description"
//       value={description}
//       onChange={(e) => setDescription(e.target.value)}
//     />
//     <Button
//       type="submit"
//       variant="contained"
//       color="primary"
//       disabled={
//         title === issue?.title &&
//         (description === issue?.description ||
//           (description === "" && !issue?.description))
//       }
//       className={classes.button}
//     >
//       Save All Changes
//     </Button>
//   </form>
//   <div className={classes.modalSection}>
//     <div className={classes.modalBottomRight}>
//       <DeleteCard issueId={issueId} setOpen={setOpen} list={list} />
//     </div>
//   </div>
// </div>
//     </Modal>
//   );
// };

// Issue.propTypes = {
//   issueId: PropTypes.number.isRequired,
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   card: PropTypes.object.isRequired,
//   list: PropTypes.object.isRequired,
// };

// export default Issue;

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

  let checkAuth = localStorage.getItem("token");

  useEffect(() => {
    setTitle(issue?.title);
    setComments(issue?.Comments);
    setDescription(issue?.description);
  }, [issue]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateIssue(issue?.id, { title, description }));
  };

  const onCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch(addComment({ singleComment }));
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
            <IssueTitle issue={issue} />
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
                description={description}
                editing={editing}
                setEditing={setEditing}
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium tempore eius alias, necessitatibus quae maiores
                voluptates nemo exercitationem sunt, error sint quam quasi.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
                neque dolores? Assumenda inventore eligendi sapiente distinctio
                repudiandae beatae porro accusantium fuga velit sit corrupti,
                amet animi aperiam dolor nam, numquam veritatis dicta adipisci
                eaque dolorem sint explicabo vitae. Eveniet laborum porro
                deserunt magni, sequi commodi?
              </div>
            )}

            <TextField
              style={{ marginTop: "75px", marginBottom: "10px" }}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              label="Add Comment"
              value={singleComment}
              onChange={(e) => setSingleComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onCommentSubmit(e)}
            />
            {comments?.map((comment) => {
              return (
                <div style={{ marginTop: "10" }}>
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
