import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getProject, updateIssue } from "../../actions/board";
import { Link } from "react-router-dom";
import CardMUI from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import SubjectIcon from "@material-ui/icons/Subject";
import { CardContent, Button } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

const IssueCard = ({ list, issue, index }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [mouseOver, setMouseOver] = useState(false);
  const [height, setHeight] = useState(0);

  const issueRef = useRef(null);
  const dispatch = useDispatch();

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
    dispatch(updateIssue(issue.id, { title }));
    setEditing(false);
    setMouseOver(false);
  };

  // console.log(issue, "this is the issue sent");

  return !issue ? (
    ""
  ) : (
    <>
      <Link
        to={`/issue/${issue.id}`}
        key={issue.id}
        style={{ textDecoration: "none" }}
      >
        <Draggable draggableId={`${issue.id}`} index={index}>
          {(provided) => (
            <CardMUI
              // className={`card ${!editing ? "mouse-over" : ""}`}
              className={`card ${mouseOver && !editing ? "mouse-over" : ""}`}
              onMouseOver={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {!editing && mouseOver && (
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
                  setMouseOver(false);
                }}
                ref={issueRef}
              >
                {issue?.title && issue?.title !== "none" && (
                  <div
                    className="card-label"
                    style={{ backgroundColor: issue.label }}
                  />
                )}
                <p>{issue?.title}</p>
                <div className="card-bottom">
                  <div className="card-bottom-left">
                    {issue?.description && (
                      <SubjectIcon
                        className="description-indicator"
                        fontSize="small"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </CardMUI>
          )}
        </Draggable>
      </Link>
    </>
  );
};

IssueCard.propTypes = {
  list: PropTypes.object.isRequired,
};

export default IssueCard;
