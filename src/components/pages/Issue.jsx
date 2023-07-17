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
import { getIssue } from "../../actions/board";
import { updateIssue } from "../../actions/board";
import { CircularProgress, Box } from "@material-ui/core";
import { Modal, TextField, Button } from "@material-ui/core";
import IssueTitle from "../card/IssueTitle";
import Navbar from "../other/Navbar";
import { useParams } from "react-router-dom";
import useStyles from "../../utils/modalStyles";
import DeleteCard from "../card/DeleteCard";

const Issue = () => {
  const issue = useSelector((state) => state?.board?.issue);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const [title, setTitle] = useState(issue?.title);
  const [description, setDescription] = useState(issue?.description || "");

  useEffect(() => {
    setTitle(issue?.title);
    setDescription(issue?.description);
  }, [issue]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateIssue(issue?.id, { title, description }));
  };

  console.log(issue, "the whole project with lists and issues");

  useEffect(() => {
    dispatch(getIssue(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (issue?.title) document.title = issue.title + " | CodeCorners PMA";
  }, [issue?.title]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

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
        {/* <div className="lists">
          
        </div> */}

        <div
          className={`${classes.paper} ${classes.issueModal}`}
          style={{ marginTop: "100px" }}
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
              {/* <Button onClick={() => setOpen(false)}>
                <CloseIcon />
              </Button> */}
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              label="Card description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
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
