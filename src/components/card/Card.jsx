import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getIssue, updateIssue } from "../../actions/board";
import { Link } from "react-router-dom";
import CardMUI from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import SubjectIcon from "@material-ui/icons/Subject";
import {
  TextField,
  CardContent,
  Button,
  Avatar,
  Tooltip,
} from "@material-ui/core";

const Card = ({ issueId, list, index }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [height, setHeight] = useState(0);

  const issueRef = useRef(null);
  const issue = useSelector((state) =>
    state?.board?.issues?.find((issue) => {
      return issue.id === issueId;
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIssue(issueId));
  }, []);

  useEffect(() => {
    if (issue) {
      setTitle(issue.title);
    }
  }, [issue]);

  useEffect(() => {
    issueRef && issueRef.current && setHeight(issueRef.current.clientHeight);
  }, [list, issue, issueRef]);

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    dispatch(updateIssue(issueId, { title }));
    setEditing(false);
  };

  return !issue ? (
    ""
  ) : (
    <>
      <Link
        to={`/issue/${issueId}`}
        key={issueId}
        style={{ textDecoration: "none" }}
      >
        <CardMUI className={`card ${!editing ? "mouse-over" : ""}`}>
          {!editing && (
            <Button
              style={{
                position: "absolute",
                bottom: height - 40,
                left: "180px",
                zIndex: 1,
              }}
              onClick={() => setEditing(true)}
            >
              <EditIcon fontSize="small" />
            </Button>
          )}
          <CardContent
          // onClick={() => {
          //   setOpenModal(true);
          // }}
          // ref={issueRef}
          >
            {issue.title && issue.title !== "none" && (
              <div
                className="card-label"
                style={{ backgroundColor: issue.label }}
              />
            )}
            <p>{issue.title}</p>
            <div className="card-bottom">
              <div className="card-bottom-left">
                {issue.description && (
                  <SubjectIcon
                    className="description-indicator"
                    fontSize="small"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </CardMUI>
      </Link>

      {/* {!editing ? (
        <CardMUI className={`card ${!editing ? "mouse-over" : ""}`}>
          {!editing && (
            <Button
              style={{
                position: "absolute",
                bottom: height - 40,
                left: "180px",
                zIndex: 1,
              }}
              onClick={() => setEditing(true)}
            >
              <EditIcon fontSize="small" />
            </Button>
          )}
          <CardContent
            onClick={() => {
              setOpenModal(true);
            }}
            ref={issueRef}
          >
            {issue.title && issue.title !== "none" && (
              <div
                className="card-label"
                style={{ backgroundColor: issue.label }}
              />
            )}
            <p>{issue.title}</p>
            <div className="card-bottom">
              <div className="card-bottom-left">
                {issue.description && (
                  <SubjectIcon
                    className="description-indicator"
                    fontSize="small"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </CardMUI>
      ) : (
        <form className="create-card-form" onSubmit={(e) => onSubmitEdit(e)}>
          <CardMUI>
            <CardContent className="card-edit-content">
              <TextField
                margin="normal"
                fullWidth
                multiline
                required
                label="Edit this card's title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDownCapture={(e) => e.key === "Enter" && onSubmitEdit(e)}
              />
            </CardContent>
          </CardMUI>
          <div className="card-actions">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                // setMouseOver(false);
                setTitle(issue.title);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </form>
      )} */}
    </>
  );
};

Card.propTypes = {
  issueId: PropTypes.number.isRequired,
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
